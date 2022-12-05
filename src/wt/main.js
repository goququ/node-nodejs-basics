import os from "node:os";
import {
  isMainThread,
  Worker,
  workerData,
  parentPort,
} from "node:worker_threads";
import url from "node:url";

const START_VALUE = 10;

const performCalculations = async () => {
  if (isMainThread) {
    const promises = Array.from({ length: os.cpus().length }).map(
      (_, index) =>
        new Promise((resolve) => {
          const worker = new Worker(url.fileURLToPath(import.meta.url), {
            workerData: START_VALUE + index,
          });

          worker.on("message", (data) => {
            resolve({
              status: "resolved",
              data: data,
            });
          });
          worker.on("error", () => {
            resolve({
              status: "error",
              data: null,
            });
          });
        })
    );

    console.log(await Promise.all(promises));
  } else {
    if (Math.random() > 0.5) {
      throw new Error("some error");
    }
    parentPort.postMessage(workerData);
  }
};

await performCalculations();
