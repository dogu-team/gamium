import { beforeAll, job, Runner, test } from '@dogu-tech/console-dest';
import { GamiumClient, GamiumDriver, Platform } from '@dogu-tech/gamium-client';

job('Test', () => {
  let game: GamiumClient;

  beforeAll(async () => {
    const gamiumDriver = await GamiumDriver.create({
      id: '1',
      platform: Platform.PLATFORM_MACOS,
      serial: 'any',
      fileDirectoryPath: 'asdfadf',
      filePath: 'asdf',
    });

    await gamiumDriver.run();
    game = gamiumDriver.game;
  });

  test('asdf', () => {
    const a = 0;
  });
});

void (async (): Promise<void> => {
  await Runner.run({
    cycle: {
      timeoutMs: 10 * 60 * 1000,
    },
  });
})();
