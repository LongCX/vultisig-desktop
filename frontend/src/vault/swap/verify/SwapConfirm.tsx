import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { storageCoinToCoin } from '../../../coin/utils/storageCoin';
import { Coin } from '../../../lib/types/coin';
import { Button } from '../../../lib/ui/buttons/Button';
import { shouldBePresent } from '../../../lib/utils/assert/shouldBePresent';
import { Chain } from '../../../model/chain';
import { ISendTransaction, TransactionType } from '../../../model/transaction';
import { makeAppPath } from '../../../navigation';
import { useAssertWalletCore } from '../../../providers/WalletCoreProvider';
import { BlockchainServiceFactory } from '../../../services/Blockchain/BlockchainServiceFactory';
import { convertChainToChainTicker } from '../../../utils/crypto';
import { getInboundAddressForChain } from '../../../utils/midgard';
import {
  useAssertCurrentVault,
  useAssertCurrentVaultAddreses,
  useAssertCurrentVaultCoin,
} from '../../state/useCurrentVault';
import { nativeTokenForChain } from '../../utils/helpers';
import { useSpecificSendTxInfoQuery } from '../queries/useSpecificSendTxInfoQuery';
import { useSwapAmount } from '../state/amount';
import { useSwapQuote } from '../state/selected-quote';
import { useSwapProtocol } from '../state/swap-protocol-type';
import { useCurrentSwapCoin } from '../state/swapCoin';
import { SwapProtocolType } from '../types';

export const SwapConfirm = () => {
  const { t } = useTranslation();
  const addresses = useAssertCurrentVaultAddreses();
  const [coinKey] = useCurrentSwapCoin();
  const coin = useAssertCurrentVaultCoin(coinKey);

  const [fromAmount] = useSwapAmount();
  const [swapProtocol] = useSwapProtocol();
  const [selectedSwapQuote] = useSwapQuote();

  const navigate = useNavigate();

  const walletCore = useAssertWalletCore();

  const vault = useAssertCurrentVault();

  const specificTxInfoQuery = useSpecificSendTxInfoQuery();

  const sender = addresses[coin.chain as Chain];

  const isMaya =
    swapProtocol === SwapProtocolType.MAYA_STREAMING ||
    swapProtocol === SwapProtocolType.MAYA;

  const isEvmErc20Asset = (asset: Coin): boolean => {
    return (
      ['ETH', 'AVAX', 'BSC', 'ARB'].includes(asset.chain) &&
      nativeTokenForChain[asset.chain] !== asset.ticker
    );
  };

  const isAssetToSend = () => {
    const isThorAsset = coin.chain === Chain.THORChain;
    const isCacao = coin.chain === Chain.MayaChain && coin.ticker === 'CACAO';
    const isMaya =
      swapProtocol === SwapProtocolType.MAYA_STREAMING ||
      swapProtocol === SwapProtocolType.MAYA;
    if (isThorAsset || isCacao) {
      if (isCacao && isMaya) {
        return false;
      } else if (isMaya) {
        return true;
      }

      return false;
    }
    return !isEvmErc20Asset(coin);
  };

  const onSubmit = async () => {
    if (isAssetToSend()) {
      const inboundAddress = await getInboundAddressForChain(
        convertChainToChainTicker(coin.chain as Chain),
        isMaya
      );
      const tx: ISendTransaction = {
        fromAddress: sender,
        toAddress: inboundAddress?.address || '',
        amount: +shouldBePresent(fromAmount),
        memo: selectedSwapQuote?.memo || '',
        coin: storageCoinToCoin(coin),
        transactionType: TransactionType.SEND,
        sendMaxAmount: false,
        specificTransactionInfo: shouldBePresent(specificTxInfoQuery.data),
      };
      const payload = BlockchainServiceFactory.createService(
        coin.chain as Chain,
        walletCore
      ).createKeysignPayload(tx, vault.local_party_id, vault.public_key_ecdsa);

      navigate(
        makeAppPath('keysign', {
          keysignPayload: JSON.stringify(payload.toJson()),
        })
      );
    }
  };

  return (
    <Button
      onClick={onSubmit}
      isDisabled={
        !isAssetToSend()
          ? 'This type of transaction is not supported yet.'
          : false
      }
    >
      {t('continue')}
    </Button>
  );
};