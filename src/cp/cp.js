import childProcess from "node:child_process";
import path from "node:path";
import url from "node:url";
import process from "node:process";

const spawnChildProcess = async (args = ["123"]) => {
  const scriptPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "files",
    "script.js"
  );

  const child = childProcess.fork(scriptPath, args, {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  child.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });
};

spawnChildProcess();
