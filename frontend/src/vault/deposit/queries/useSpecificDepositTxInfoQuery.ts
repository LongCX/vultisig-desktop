import { useQuery } from '@tanstack/react-query';

import { AccountCoinKey } from '../../../coin/AccountCoin';
import { storageCoinToCoin } from '../../../coin/utils/storageCoin';
import { useAssertWalletCore } from '../../../providers/WalletCoreProvider';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { useCurrentVaultCoin } from '../../state/currentVault';
import { useCurrentVaultAddress } from '../../state/currentVault';
import { useCurrentDepositCoin } from '../hooks/useCurrentDepositCoin';

export const getSpecificDepositTxInfoQueryKey = (coinKey: AccountCoinKey) => [
  'specificSendTxInfo',
  coinKey,
];

export const useSpecificDepositTxInfoQuery = () => {
  const walletCore = useAssertWalletCore();
  const [coinKey] = useCurrentDepositCoin();
  const coin = useCurrentVaultCoin(coinKey);
  const address = useCurrentVaultAddress(coinKey.chainId);

  return useQuery({
    queryKey: getSpecificDepositTxInfoQueryKey({
      ...coinKey,
      address,
    }),
    queryFn: async () => {
      const service = ServiceFactory.getService(coinKey.chainId, walletCore);
      return await service.feeService.getFee(storageCoinToCoin(coin));
    },
  });
};