export async function checkTime<T>(name: string, promise: Promise<T>): Promise<T> {
  const startTime = performance.now();
  const ret: T = await promise;
  const endTime = performance.now();
  console.log(`[CheckTime] ${name}.elapsed ${((endTime - startTime) / 1000).toFixed(2)}s`);
  return ret;
}
