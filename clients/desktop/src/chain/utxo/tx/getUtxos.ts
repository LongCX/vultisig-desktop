import { create } from '@bufbuild/protobuf';
import { UtxoInfoSchema } from '@core/communication/vultisig/keysign/v1/utxo_info_pb';

import { UtxoChain } from '../../../model/chain';
import { ChainAccount } from '../../ChainAccount';
import { getUtxoAddressInfo } from '../blockchair/getUtxoAddressInfo';

export const getUtxos = async (account: ChainAccount<UtxoChain>) => {
  const { data } = await getUtxoAddressInfo(account);

  const { utxo } = data[account.address];

  return utxo.map(({ transaction_hash, value, index }) =>
    create(UtxoInfoSchema, {
      hash: transaction_hash,
      amount: BigInt(value),
      index,
    })
  );
};
