import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import stream from "node:stream/promises";

const transform = async () => {
  const filePath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "files",
    "fileToWrite.txt"
  );
  const writableStream = fs.createWriteStream(filePath);

  const res = await stream.pipeline(
    process.stdin,
    async function* (source, { signal }) {
      source.setEncoding("utf8");
      for await (const chunk of source) {
        yield [...chunk.toString()].reverse().join("");
      }
    },
    writableStream
  );
};

await transform();
