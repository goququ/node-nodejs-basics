import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const write = async () => {
  const filePath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "files",
    "fileToWrite.txt"
  );
  const writableStream = fs.createWriteStream(filePath);

  process.stdin.on("data", (data) => {
    writableStream.write(data.toString("utf-8"));
  });

  process.stdin.on("end", () => {
    writableStream.close();
  });
};

await write();
