import { Chain, EvmChain, UtxoChain } from '../../../../model/chain';
import { getUtxoFeeUnit } from '../../../utxo/fee/getUtxoFeeUnit';
import { gwei } from './evm';
import { getChainFeeCoin } from './getChainFeeCoin';

export const getFeeUnit = (chain: Chain): string => {
  if (chain in EvmChain) {
    return gwei.name;
  }

  if (chain in UtxoChain) {
    return getUtxoFeeUnit(chain as UtxoChain);
  }

  return getChainFeeCoin(chain).ticker;
};
