export interface SendKeyOptions {
  duratiomMs: number;
}

export function DefaultSendKeyOptions(): SendKeyOptions {
  return {
    duratiomMs: 100,
  };
}
