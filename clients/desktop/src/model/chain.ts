/*

WARNING: Never change the string of the enum values. It must match with IOS/Android app. They are case sensitive!

*/

export enum EvmChain {
  Arbitrum = 'Arbitrum',
  Avalanche = 'Avalanche',
  Base = 'Base',
  CronosChain = 'CronosChain',
  BSC = 'BSC',
  Blast = 'Blast',
  Ethereum = 'Ethereum',
  Optimism = 'Optimism',
  Polygon = 'Polygon',
  Zksync = 'Zksync',
}

export enum UtxoChain {
  Bitcoin = 'Bitcoin',
  BitcoinCash = 'Bitcoin-Cash',
  Litecoin = 'Litecoin',
  Dogecoin = 'Dogecoin',
  Dash = 'Dash',
}

export enum CosmosChain {
  THORChain = 'THORChain',
  Cosmos = 'Cosmos',
  Osmosis = 'Osmosis',
  MayaChain = 'MayaChain',
  Dydx = 'Dydx',
  Kujira = 'Kujira',
  Terra = 'Terra',
  TerraClassic = 'TerraClassic',
  Noble = 'Noble',
  Akash = 'Akash',
}

export enum OtherChain {
  Sui = 'Sui',
  Solana = 'Solana',
  Polkadot = 'Polkadot',
  Ton = 'Ton',
  Ripple = 'Ripple',
}

export const Chain = {
  ...EvmChain,
  ...UtxoChain,
  ...CosmosChain,
  ...OtherChain,
};

export type Chain = EvmChain | UtxoChain | CosmosChain | OtherChain;

export enum TssAction {
  KEYGEN = 'KEYGEN',
  RESHARE = 'RESHARE',
}

export const chainKindRecord = {
  [EvmChain.Arbitrum]: 'evm',
  [EvmChain.Avalanche]: 'evm',
  [EvmChain.Base]: 'evm',
  [EvmChain.CronosChain]: 'evm',
  [EvmChain.BSC]: 'evm',
  [EvmChain.Blast]: 'evm',
  [EvmChain.Ethereum]: 'evm',
  [EvmChain.Optimism]: 'evm',
  [EvmChain.Polygon]: 'evm',
  [EvmChain.Zksync]: 'evm',

  [UtxoChain.Bitcoin]: 'utxo',
  [UtxoChain.BitcoinCash]: 'utxo',
  [UtxoChain.Litecoin]: 'utxo',
  [UtxoChain.Dogecoin]: 'utxo',
  [UtxoChain.Dash]: 'utxo',

  [CosmosChain.THORChain]: 'cosmos',
  [CosmosChain.Cosmos]: 'cosmos',
  [CosmosChain.Osmosis]: 'cosmos',
  [CosmosChain.MayaChain]: 'cosmos',
  [CosmosChain.Dydx]: 'cosmos',
  [CosmosChain.Kujira]: 'cosmos',
  [CosmosChain.Terra]: 'cosmos',
  [CosmosChain.TerraClassic]: 'cosmos',
  [CosmosChain.Noble]: 'cosmos',
  [CosmosChain.Akash]: 'cosmos',

  [OtherChain.Sui]: 'sui',
  [OtherChain.Solana]: 'solana',
  [OtherChain.Polkadot]: 'polkadot',
  [OtherChain.Ton]: 'ton',
  [OtherChain.Ripple]: 'ripple',
} as const;

export type ChainKind = (typeof chainKindRecord)[Chain];

export type DeriveChainKind<T> = T extends Chain
  ? (typeof chainKindRecord)[T]
  : never;

export function getChainKind<T extends Chain>(chain: T): DeriveChainKind<T> {
  return chainKindRecord[chain] as DeriveChainKind<T>;
}

export const maxSendAmountEnabledChains = Object.values(UtxoChain);

export type SignatureFormat = 'raw' | 'der' | 'rawWithRecoveryId';

export const signatureFormatRecord: Record<ChainKind, SignatureFormat> = {
  evm: 'rawWithRecoveryId',
  cosmos: 'rawWithRecoveryId',
  sui: 'raw',
  solana: 'raw',
  polkadot: 'raw',
  ton: 'raw',
  utxo: 'der',
  ripple: 'der',
};
