import { Condition } from './condition';
import { GamiumClient } from './gamium-client';

export type WaitCondition<Type> = PromiseLike<Type> | Condition<Type> | ((driver: GamiumClient) => Type | PromiseLike<Type>);
