import { NpmPublisher } from '@dogu-dev-private/publish-package';

(async (): Promise<void> => {
  const publisher = new NpmPublisher();
  await publisher.publish();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
