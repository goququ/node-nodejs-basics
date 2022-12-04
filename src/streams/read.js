import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import process from "node:process";

const read = async () => {
  const filePath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "files",
    "fileToRead.txt"
  );
  const rr = await fs.createReadStream(filePath);

  rr.on("data", (data) => {
    process.stdout.write(data.toString("utf-8"));
  });
};

await read();
