import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const create = async () => {
  const CURRENT_DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
  const FILENAME = "fresh.txt";
  const PATH = path.resolve(CURRENT_DIRNAME, "files", FILENAME);
  const FILE_CONTENT = "I am fresh and young";

  try {
    await fs.writeFile(PATH, FILE_CONTENT, { flag: "ax+" });
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await create();
