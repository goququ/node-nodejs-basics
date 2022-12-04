import fs from "node:fs/promises";
import path from "node:path";
import { getDirNameFromMetaUrl } from "./utils/index.js";

const remove = async () => {
  const dir = getDirNameFromMetaUrl(import.meta.url);
  const filePath = path.resolve(dir, "files", "fileToRemove.txt");

  try {
    await fs.rm(filePath);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await remove();
