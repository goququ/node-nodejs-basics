import fs from "node:fs/promises";
import path from "node:path";
import { isFileOrDirExist, getDirNameFromMetaUrl } from "./utils/index.js";

const list = async () => {
  const currentDirname = getDirNameFromMetaUrl(import.meta.url);
  const dirPath = path.resolve(currentDirname, "files");
  const isDirExist = await isFileOrDirExist(dirPath);

  if (!isDirExist) {
    throw new Error("FS operation failed");
  }

  const files = await fs.readdir(dirPath);

  console.log(files);
};

await list();
