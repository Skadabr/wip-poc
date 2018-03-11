const tradingRules = require('./tradingRules');
const _ = require('lodash');

function trade(source, target) {
  let sourceFeatures = getTradingFeatures(source);
  let targetFeatures = getTradingFeatures(target);
  let tradingFunction = findMatchFunction(sourceFeatures, targetFeatures);

  return tradingFunction(source, target);
}

function getTradingFeatures(unit) {
  let tradingFeatures = ["SHIELD", "POISON"];
  return unit.features
    .filter(feature => tradingFeatures.includes(feature));
}

function findMatchFunction(sourceFeatures, targetFeatures) {
  //default trading function
  let tradingFunction = function (source, target) {
    target.receivedDamage += source.attack;
    return target;
  };

  for (let tradingRule of tradingRules) {
    if (
      _.isEqual(sourceFeatures, tradingRule.sourceFeatures) &&
      _.isEqual(targetFeatures, tradingRule.targetFeatures)
    ) {
      tradingFunction = tradingRule.action;
      break;
    }
  }
  return tradingFunction;
}
module.exports = trade;