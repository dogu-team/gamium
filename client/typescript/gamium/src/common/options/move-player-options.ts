import { MovePlayerBy } from '../protocols/generated';

export interface MovePlayerOptions {
  by: MovePlayerBy;
  epsilon: number;
  checkHeight: boolean;
}

export function DefaultMovePlayerOptions(): MovePlayerOptions {
  return {
    by: MovePlayerBy.KeyPress,
    epsilon: 0.6,
    checkHeight: false,
  };
}
