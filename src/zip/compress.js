import stream from "node:stream";
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import url from "node:url";

const compress = async () => {
  const fileToCompressPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "files",
    "fileToCompress.txt"
  );
  const resultFilePath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "files",
    "archive.gz"
  );

  await stream.pipeline(
    fs.createReadStream(fileToCompressPath),
    zlib.createGzip(),
    fs.createWriteStream(resultFilePath),
    (err) => {
      if (err) {
        throw new Error(err);
      }
    }
  );
  console.log("Pipeline succeeded.");
};

await compress();
