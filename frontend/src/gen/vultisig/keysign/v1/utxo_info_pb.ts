// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file vultisig/keysign/v1/utxo_info.proto (package vultisig.keysign.v1, syntax proto3)
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

/**
 * @generated from message vultisig.keysign.v1.UtxoInfo
 */
export class UtxoInfo extends Message<UtxoInfo> {
  /**
   * @generated from field: string hash = 1;
   */
  hash = '';

  /**
   * @generated from field: int64 amount = 2;
   */
  amount = protoInt64.zero;

  /**
   * @generated from field: uint32 index = 3;
   */
  index = 0;

  constructor(data?: PartialMessage<UtxoInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = 'vultisig.keysign.v1.UtxoInfo';
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'hash', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'amount', kind: 'scalar', T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: 'index', kind: 'scalar', T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): UtxoInfo {
    return new UtxoInfo().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): UtxoInfo {
    return new UtxoInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): UtxoInfo {
    return new UtxoInfo().fromJsonString(jsonString, options);
  }

  static equals(
    a: UtxoInfo | PlainMessage<UtxoInfo> | undefined,
    b: UtxoInfo | PlainMessage<UtxoInfo> | undefined
  ): boolean {
    return proto3.util.equals(UtxoInfo, a, b);
  }
}