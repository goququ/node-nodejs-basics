import fs from "node:fs/promises";
import path from "node:path";
import { isFileOrDirExist, getDirNameFromMetaUrl } from "./utils/index.js";

const read = async () => {
  const currentDir = getDirNameFromMetaUrl(import.meta.url);
  const filePath = path.resolve(currentDir, "files", "fileToRead.txt");
  const isFileExist = await isFileOrDirExist(filePath);

  if (!isFileExist) {
    throw new Error("FS operation failed");
  }

  const content = await fs.readFile(filePath, { encoding: "utf-8" });

  console.log(content);
};

await read();
