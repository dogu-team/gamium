export interface ActionsDragOptions {
  durationMs: number;
  intervalMs: number;
}

export function DefaultActionsDragOptions(): ActionsDragOptions {
  return {
    durationMs: 300,
    intervalMs: 60,
  };
}
