export interface ActionsScrollOptions {
  durationMs: number;
}

export function DefaultActionScrollOptions(): ActionsScrollOptions {
  return {
    durationMs: 300,
  };
}
