import fs from "node:fs/promises";
import url from "node:url";
import path from "node:path";

export const isFileOrDirExist = async (path) => {
  try {
    await fs.access(path);
  } catch (_) {
    return false;
  }
  return true;
};

export const getDirNameFromMetaUrl = (urlString) =>
  path.dirname(url.fileURLToPath(urlString));
