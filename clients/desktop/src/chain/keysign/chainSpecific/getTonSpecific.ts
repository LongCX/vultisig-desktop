import { create } from '@bufbuild/protobuf';
import { TonSpecificSchema } from '@core/communication/vultisig/keysign/v1/blockchain_specific_pb';

import { getTonAccountInfo } from '../../ton/account/getTonAccountInfo';
import { KeysignChainSpecificValue } from '../KeysignChainSpecific';
import { GetChainSpecificInput } from './GetChainSpecificInput';

export const getTonSpecific = async ({
  coin,
}: GetChainSpecificInput): Promise<KeysignChainSpecificValue> => {
  const { account_state } = await getTonAccountInfo(coin.address);
  const sequenceNumber = BigInt(account_state.seqno || 0);

  return create(TonSpecificSchema, {
    sequenceNumber,
    expireAt: BigInt(Math.floor(Date.now() / 1000) + 600),
    bounceable: false,
  });
};
