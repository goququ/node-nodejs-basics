import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const copy = async () => {
  const CURRENT_DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
  const DIR_TO_COPY = path.resolve(CURRENT_DIRNAME, "files");
  const DEST_DIR = path.resolve(CURRENT_DIRNAME, "files_copy");

  try {
    fs.access(DIR_TO_COPY);
  } catch (err) {
    throw new Error(`FS operation failed`);
  }

  let distDirStat;

  try {
    distDirStat = await fs.lstat(DEST_DIR);
  } catch (err) {
    console.log("Dist not exists");
  }

  if (distDirStat?.isDirectory()) {
    throw new Error(`FS operation failed`);
  }

  await fs.mkdir(path.resolve(DEST_DIR));

  const files = await fs.readdir(DIR_TO_COPY);
  const promises = files.map(async (file) => {
    const fileFrom = path.resolve(DIR_TO_COPY, file);
    const fileTo = path.resolve(DEST_DIR, file);
    return await fs.copyFile(fileFrom, fileTo);
  });

  Promise.all(promises).catch(() => {
    throw new Error(`FS operation failed`);
  });
};

copy();
