import {
  isMainThread,
  Worker,
  workerData,
  parentPort,
} from "node:worker_threads";
import url from "node:url";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  if (isMainThread) {
    const worker = new Worker(url.fileURLToPath(import.meta.url), {
      workerData: 40,
    });

    worker.on("message", (res) => {
      console.log(`Main thread received: ${res}`);
      worker.terminate();
    });
  } else {
    parentPort.postMessage(nthFibonacci(workerData));
  }
};

sendResult();
