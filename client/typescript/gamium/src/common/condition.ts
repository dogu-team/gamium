import { GamiumClient } from './gamium-client';
import { UIElement } from './object/ui-element';
import { ObjectInfo } from './protocols/types';

type ConditionFn<Type> = (driver: GamiumClient) => PromiseLike<Type>;
export class Condition<Type> {
  constructor(public readonly message: string, public readonly contidionFunc: ConditionFn<Type>) {}
}

export class ObjectInfoCondition extends Condition<ObjectInfo> {
  private _nominal: undefined;
}

export class ObjectInfosCondition extends Condition<ObjectInfo[]> {
  private _nominal: undefined;
}

export class UIElementCondition extends Condition<UIElement> {
  private _nominal: undefined;
}
