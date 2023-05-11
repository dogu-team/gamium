export type LeveledLogMethod = (
  message: unknown,
  details?: Record<string, unknown>
) => void;

export interface Printable {
  error: LeveledLogMethod;
  warn?: LeveledLogMethod;
  info: LeveledLogMethod;
  debug?: LeveledLogMethod;
  verbose?: LeveledLogMethod;
}
