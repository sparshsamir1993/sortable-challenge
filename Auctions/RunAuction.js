let fs = require("fs");
let path = require("path");
let printToFile = require("../Utils/printToFile");
const findMaxBidder = require("./FindMaxBidder");
exports.RunAuction = () => {
  let rawConfig = fs.readFileSync(
    path.join(__dirname + "/../auction/config.json")
  );
  let rawInput = fs.readFileSync(__dirname + "/input.json");
  let config = JSON.parse(rawConfig);
  let input = JSON.parse(rawInput);
  console.log(config);
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
  let maxBidders = findMaxBidder(input, siteDetailMap, bidderAdjustmentMap);
  // console.log(maxBidders);
  printToFile(JSON.stringify(maxBidders, null, 4));
};
