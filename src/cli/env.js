import process from "node:process";

const PREFIX = "RSS_";
const parseEnv = () => {
  let rssEnvs = Object.entries(process.env).reduce((acc, [key, value]) => {
    if (key.startsWith(PREFIX)) {
      acc += `${key}=${value};`;
    }
    return acc;
  }, "");

  if (rssEnvs.endsWith(";")) {
    rssEnvs = rssEnvs.slice(0, rssEnvs.length - 1);
  }

  console.log(rssEnvs);
};

parseEnv();
