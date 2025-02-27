import { create } from '@bufbuild/protobuf';
import { CoinSchema } from '@core/communication/vultisig/keysign/v1/coin_pb';
import { PublicKey } from '@trustwallet/wallet-core/dist/src/wallet-core';
import { WalletCore } from '@trustwallet/wallet-core/dist/src/wallet-core';

import { assertChainField } from '../../chain/utils/assertChainField';
import { deriveAddress } from '../../chain/utils/deriveAddress';
import { stripHexPrefix } from '../../chain/utils/stripHexPrefix';
import { CoinMeta } from '../../model/coin-meta';

type CreateCoinInput = {
  coinMeta: CoinMeta;
  publicKey: PublicKey;
  walletCore: WalletCore;
};

export const createCoin = ({
  coinMeta,
  publicKey,
  walletCore,
}: CreateCoinInput) => {
  const { chain } = assertChainField(coinMeta);

  const address = deriveAddress({
    chain,
    publicKey,
    walletCore,
  });

  const hexPublicKey = stripHexPrefix(
    walletCore.HexCoding.encode(publicKey.data())
  );

  return create(CoinSchema, {
    ...coinMeta,
    address: address,
    hexPublicKey,
  });
};
