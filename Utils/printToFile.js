let fs = require("fs");

let printToFile = (data) => {
  fs.writeFileSync("output.json", data);
};

module.exports = printToFile;
