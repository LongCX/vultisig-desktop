// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file vultisig/keysign/v1/thorchain_swap_payload.proto (package vultisig.keysign.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from '@bufbuild/protobuf';
import { Message, proto3, protoInt64 } from '@bufbuild/protobuf';
import { Coin } from './coin_pb.js';

/**
 * @generated from message vultisig.keysign.v1.THORChainSwapPayload
 */
export class THORChainSwapPayload extends Message<THORChainSwapPayload> {
  /**
   * @generated from field: string from_address = 1;
   */
  fromAddress = '';

  /**
   * @generated from field: vultisig.keysign.v1.Coin from_coin = 2;
   */
  fromCoin?: Coin;

  /**
   * @generated from field: vultisig.keysign.v1.Coin to_coin = 3;
   */
  toCoin?: Coin;

  /**
   * @generated from field: string vault_address = 4;
   */
  vaultAddress = '';

  /**
   * @generated from field: optional string router_address = 5;
   */
  routerAddress?: string;

  /**
   * @generated from field: string from_amount = 6;
   */
  fromAmount = '';

  /**
   * @generated from field: string to_amount_decimal = 7;
   */
  toAmountDecimal = '';

  /**
   * @generated from field: string to_amount_limit = 8;
   */
  toAmountLimit = '';

  /**
   * @generated from field: string streaming_interval = 9;
   */
  streamingInterval = '';

  /**
   * @generated from field: string streaming_quantity = 10;
   */
  streamingQuantity = '';

  /**
   * @generated from field: uint64 expiration_time = 11;
   */
  expirationTime = protoInt64.zero;

  /**
   * @generated from field: bool is_affiliate = 12;
   */
  isAffiliate = false;

  constructor(data?: PartialMessage<THORChainSwapPayload>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'vultisig.keysign.v1.THORChainSwapPayload';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'from_address',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    { no: 2, name: 'from_coin', kind: 'message', T: Coin },
    { no: 3, name: 'to_coin', kind: 'message', T: Coin },
    {
      no: 4,
      name: 'vault_address',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 5,
      name: 'router_address',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    {
      no: 6,
      name: 'from_amount',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 7,
      name: 'to_amount_decimal',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 8,
      name: 'to_amount_limit',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 9,
      name: 'streaming_interval',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 10,
      name: 'streaming_quantity',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 11,
      name: 'expiration_time',
      kind: 'scalar',
      T: 4 /* ScalarType.UINT64 */,
    },
    {
      no: 12,
      name: 'is_affiliate',
      kind: 'scalar',
      T: 8 /* ScalarType.BOOL */,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): THORChainSwapPayload {
    return new THORChainSwapPayload().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): THORChainSwapPayload {
    return new THORChainSwapPayload().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): THORChainSwapPayload {
    return new THORChainSwapPayload().fromJsonString(jsonString, options);
  }

  static equals(
    a: THORChainSwapPayload | PlainMessage<THORChainSwapPayload> | undefined,
    b: THORChainSwapPayload | PlainMessage<THORChainSwapPayload> | undefined
  ): boolean {
    return proto3.util.equals(THORChainSwapPayload, a, b);
  }
}