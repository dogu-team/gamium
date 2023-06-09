// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { InputMouseButtonCode } from '../../../../gamium/protocol/types/input-mouse-button-code.js';
import { InputMousePressType } from '../../../../gamium/protocol/types/input-mouse-press-type.js';
import { Vector2, Vector2T } from '../../../../gamium/protocol/types/vector2.js';

export class InputMouseParam implements flatbuffers.IUnpackableObject<InputMouseParamT> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): InputMouseParam {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsInputMouseParam(bb: flatbuffers.ByteBuffer, obj?: InputMouseParam): InputMouseParam {
    return (obj || new InputMouseParam()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsInputMouseParam(bb: flatbuffers.ByteBuffer, obj?: InputMouseParam): InputMouseParam {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new InputMouseParam()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  press(): InputMousePressType {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt16(this.bb_pos + offset) : InputMousePressType.DOWN;
  }

  button(): InputMouseButtonCode {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt16(this.bb_pos + offset) : InputMouseButtonCode.LEFT;
  }

  position(obj?: Vector2): Vector2 | null {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? (obj || new Vector2()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  delta(obj?: Vector2): Vector2 | null {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? (obj || new Vector2()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  static startInputMouseParam(builder: flatbuffers.Builder) {
    builder.startObject(4);
  }

  static addPress(builder: flatbuffers.Builder, press: InputMousePressType) {
    builder.addFieldInt16(0, press, InputMousePressType.DOWN);
  }

  static addButton(builder: flatbuffers.Builder, button: InputMouseButtonCode) {
    builder.addFieldInt16(1, button, InputMouseButtonCode.LEFT);
  }

  static addPosition(builder: flatbuffers.Builder, positionOffset: flatbuffers.Offset) {
    builder.addFieldStruct(2, positionOffset, 0);
  }

  static addDelta(builder: flatbuffers.Builder, deltaOffset: flatbuffers.Offset) {
    builder.addFieldStruct(3, deltaOffset, 0);
  }

  static endInputMouseParam(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  unpack(): InputMouseParamT {
    return new InputMouseParamT(
      this.press(),
      this.button(),
      this.position() !== null ? this.position()!.unpack() : null,
      this.delta() !== null ? this.delta()!.unpack() : null,
    );
  }

  unpackTo(_o: InputMouseParamT): void {
    _o.press = this.press();
    _o.button = this.button();
    _o.position = this.position() !== null ? this.position()!.unpack() : null;
    _o.delta = this.delta() !== null ? this.delta()!.unpack() : null;
  }
}

export class InputMouseParamT implements flatbuffers.IGeneratedObject {
  constructor(
    public press: InputMousePressType = InputMousePressType.DOWN,
    public button: InputMouseButtonCode = InputMouseButtonCode.LEFT,
    public position: Vector2T | null = null,
    public delta: Vector2T | null = null,
  ) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    InputMouseParam.startInputMouseParam(builder);
    InputMouseParam.addPress(builder, this.press);
    InputMouseParam.addButton(builder, this.button);
    InputMouseParam.addPosition(builder, this.position !== null ? this.position!.pack(builder) : 0);
    InputMouseParam.addDelta(builder, this.delta !== null ? this.delta!.pack(builder) : 0);

    return InputMouseParam.endInputMouseParam(builder);
  }
}
