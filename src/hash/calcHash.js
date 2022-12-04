import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const calculateHash = async () => {
  const pathToFile = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "files",
    "fileToCalculateHashFor.txt"
  );
  const fileBuffer = await fs.readFile(pathToFile);
  const hashSum = crypto.createHash("sha256");

  hashSum.update(fileBuffer);

  const hex = hashSum.digest("hex");

  console.log(hex);
};

await calculateHash();
