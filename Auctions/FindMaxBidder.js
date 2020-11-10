let fs = require("fs");

let findMaxBidder = (input, siteDetailMap, bidderAdjustmentMap) => {
  let result = [];
  for (siteAuction of input) {
    let maxHash = {};
    for (areaUnit of siteAuction.bids) {
      let adjustment = bidderAdjustmentMap[areaUnit.bidder];
      let adjustedVal = Number.parseFloat(
        (areaUnit.bid + areaUnit.bid * adjustment).toFixed(4)
      );
      if (!maxHash[areaUnit.unit]) {
        maxHash[areaUnit.unit] = { ...areaUnit, adjustedVal };
      } else {
        if (maxHash[areaUnit.unit].adjustedVal < adjustedVal) {
          maxHash[areaUnit.unit] = { ...areaUnit, adjustedVal };
        }
      }
    }
    let siteAuctionResult = [];
    for (adUnit in maxHash) {
      let { bidder, unit, bid } = maxHash[adUnit];
      siteAuctionResult.push({ bidder, bid, unit });
    }
    result.push(siteAuctionResult);
  }

  return siteDetailMap;
};

module.exports = findMaxBidder;
