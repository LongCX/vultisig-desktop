import { getLastItem } from '@lib/utils/array/getLastItem';
import { matchRecordUnion } from '@lib/utils/matchRecordUnion';
import { chainPromises } from '@lib/utils/promise/chainPromises';
import { recordFromItems } from '@lib/utils/record/recordFromItems';
import { useMutation } from '@tanstack/react-query';
import { keccak256 } from 'js-sha3';

import { Keysign } from '../../../../../wailsjs/go/tss/TssService';
import { KeysignMessagePayload } from '../../../../chain/keysign/KeysignMessagePayload';
import { compileTx } from '../../../../chain/tx/compile/compileTx';
import { executeTx } from '../../../../chain/tx/execute/executeTx';
import { generateSignature } from '../../../../chain/tx/signature/generateSignature';
import { getPreSigningHashes } from '../../../../chain/tx/utils/getPreSigningHashes';
import { getCoinType } from '../../../../chain/walletCore/getCoinType';
import { hexEncode } from '../../../../chain/walletCore/hexEncode';
import { getChainKind } from '../../../../model/chain';
import { signatureFormatRecord } from '../../../../model/chain';
import { useAssertWalletCore } from '../../../../providers/WalletCoreProvider';
import { useCurrentSessionId } from '../../../keygen/shared/state/currentSessionId';
import { useCurrentServerUrl } from '../../../keygen/state/currentServerUrl';
import { getVaultPublicKey } from '../../../publicKey/getVaultPublicKey';
import { useCurrentHexEncryptionKey } from '../../../setup/state/currentHexEncryptionKey';
import { useCurrentVault } from '../../../state/currentVault';
import { customMessageConfig } from '../../customMessage/config';
import { getKeysignChain } from '../../utils/getKeysignChain';
import { getTssKeysignType } from '../../utils/getTssKeysignType';
import { getTxInputData } from '../../utils/getTxInputData';

export const useKeysignMutation = (payload: KeysignMessagePayload) => {
  const walletCore = useAssertWalletCore();
  const vault = useCurrentVault();
  const sessionId = useCurrentSessionId();
  const encryptionKeyHex = useCurrentHexEncryptionKey();
  const serverUrl = useCurrentServerUrl();

  return useMutation({
    mutationFn: async () => {
      return matchRecordUnion(payload, {
        keysign: async payload => {
          const chain = getKeysignChain(payload);

          const inputs = await getTxInputData({
            keysignPayload: payload,
            walletCore,
          });

          const groupedMsgs = inputs.map(txInputData =>
            getPreSigningHashes({
              txInputData,
              walletCore,
              chain,
            }).map(value =>
              hexEncode({
                value,
                walletCore,
              })
            )
          );

          const msgs = groupedMsgs.flat().sort();

          const tssType = getTssKeysignType(chain);

          const coinType = getCoinType({ walletCore, chain });

          const signatures = await Keysign(
            vault,
            msgs,
            vault.local_party_id,
            walletCore.CoinTypeExt.derivationPath(coinType),
            sessionId,
            encryptionKeyHex,
            serverUrl,
            tssType
          );

          const signaturesRecord = recordFromItems(signatures, ({ msg }) =>
            Buffer.from(msg, 'base64').toString('hex')
          );

          const publicKey = await getVaultPublicKey({
            vault,
            chain,
            walletCore,
          });

          const hashes = await chainPromises(
            inputs.map(async txInputData => {
              const compiledTx = compileTx({
                walletCore,
                txInputData,
                chain,
                publicKey,
                signatures: signaturesRecord,
              });

              return executeTx({
                compiledTx,
                walletCore,
                chain,
              });
            })
          );

          return getLastItem(hashes);
        },
        custom: async ({ message }) => {
          const derivePath = walletCore.CoinTypeExt.derivationPath(
            getCoinType({ walletCore, chain: customMessageConfig.chain })
          );

          const [signature] = await Keysign(
            vault,
            [keccak256(message)],
            vault.local_party_id,
            derivePath,
            sessionId,
            encryptionKeyHex,
            serverUrl,
            customMessageConfig.tssType
          );

          const signatureFormat =
            signatureFormatRecord[getChainKind(customMessageConfig.chain)];

          const result = generateSignature({
            walletCore,
            signature,
            signatureFormat,
          });

          return Buffer.from(result).toString('hex');
        },
      });
    },
  });
};
