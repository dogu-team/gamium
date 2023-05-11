export interface ActionsClickOptions {
  durationMs: number;
}

export function DefaultActionClickOptions(): ActionsClickOptions {
  return {
    durationMs: 60,
  };
}
