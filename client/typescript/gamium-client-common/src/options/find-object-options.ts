export interface FindObjectOptions {
  delayMs: number;
}

export function DefaultFindObjectOptions(): FindObjectOptions {
  return {
    delayMs: 60,
  };
}
