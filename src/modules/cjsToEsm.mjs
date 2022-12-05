import path from "path";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import { fileURLToPath } from "url";
import fs from "node:fs/promises";
import "./files/c.js";

const random = Math.random();

let unknownObject;

const readJSON = async (path) =>
  JSON.parse(await fs.readFile(new URL(path, import.meta.url)));

await (async function () {
  if (random > 0.5) {
    unknownObject = await readJSON("./files/a.json");
  } else {
    unknownObject = await readJSON("./files/b.json");
  }
})();

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${fileURLToPath(import.meta.url)}`);
console.log(
  `Path to current directory is ${path.dirname(fileURLToPath(import.meta.url))}`
);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export default {
  unknownObject,
  myServer,
};
