export interface WaitOptions {
  timeoutMs: number;
  message: string;
  intervalMs: number;
  ignoreError: boolean;
}

export const DefaultWaitOptions = (): WaitOptions => {
  return {
    timeoutMs: 5000,
    message: '',
    intervalMs: 100,
    ignoreError: true,
  };
};
