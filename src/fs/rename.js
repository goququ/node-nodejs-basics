import fs from "node:fs/promises";
import path from "node:path";
import { isFileOrDirExist, getDirNameFromMetaUrl } from "./utils/index.js";

const rename = async () => {
  const CURRENT_DIRNAME = getDirNameFromMetaUrl(import.meta.url);
  const FILEPATH = path.resolve(CURRENT_DIRNAME, "files", "wrongFilename.txt");
  const NEW_FILEPATH = path.resolve(
    CURRENT_DIRNAME,
    "files",
    "properFilename.md"
  );

  const isSourceExist = await isFileOrDirExist(FILEPATH);
  const isDistFileExist = await isFileOrDirExist(NEW_FILEPATH);

  if (!isSourceExist || isDistFileExist) {
    throw new Error(`FS operation failed`);
  }

  fs.rename(FILEPATH, NEW_FILEPATH);
};

await rename();
