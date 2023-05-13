export type BrowserPlatform = 'windows' | 'macos' | 'linux';

export function getBrowserPlatform(
  fallbackPlatform?: BrowserPlatform,
): BrowserPlatform {
  if (navigator.platform.indexOf('Win') > -1) {
    return 'windows';
  } else if (navigator.platform.indexOf('Mac') > -1) {
    return 'macos';
  }
  return fallbackPlatform ?? 'linux';
}
