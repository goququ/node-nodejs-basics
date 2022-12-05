import process from "node:process";

const parseArgs = () => {
  const args = process.argv.slice(2);
  let resultObj = {};
  let currentArg = null;

  for (let arg of args) {
    if (arg.startsWith("--")) {
      currentArg = arg.slice(2);

      if (!(currentArg in resultObj)) {
        resultObj[currentArg] = [];
      }
      continue;
    }

    if (!currentArg) {
      continue;
    }

    resultObj[currentArg].push(arg);
  }

  let resultStr = Object.entries(resultObj).reduce((acc, [key, value]) => {
    acc += `${key} is ${value.join("&")}, `;
    return acc;
  }, "");

  if (resultStr.endsWith(", ")) {
    resultStr = resultStr.slice(0, -2);
  }

  console.log(resultStr);
};

parseArgs();
