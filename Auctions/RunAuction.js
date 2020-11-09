let fs = require("fs");
let printToFile = require("../Utils/printToFile");
exports.RunAuction = () => {
  let rawConfig = fs.readFileSync(__dirname + "/config.json");
  let rawInput = fs.readFileSync(__dirname + "/input.json");
  let config = JSON.parse(rawConfig);
  let input = JSON.parse(rawInput);

  // setting up config

  let siteList = config.sites;
  let siteDetailMap = {};
  let bidderAdjustmentMap = {};
  config.bidders.forEach((x) => (bidderAdjustmentMap[x.name] = x.adjustment));
  siteList.forEach(
    (x) =>
      (siteDetailMap[x.name] = {
        floor: x.floor,
        bidders: new Set(x.bidders),
      })
  );

  //processing aution list (input)
  printToFile(JSON.stringify(siteDetailMap, null, 4));

  console.log(siteDetailMap, bidderAdjustmentMap);
};
