export const DefaultGamiumEnginePort = 50061;

export interface GamiumClientOptions {
  port: number;
}

export function DefaultGamiumClientOptions(): GamiumClientOptions {
  return {
    port: DefaultGamiumEnginePort,
  };
}
