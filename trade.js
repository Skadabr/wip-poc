const tradingRules = require('./tradingRules');
const _ = require('lodash');

function trade(source, target) {
  let tradingFunction = findMatchFunction(source, target);
  return tradingFunction(source, target);
}

function findMatchFunction(source, target) {
  let tradingFunction = function (source, target) {
    target.health = target.health - source.attack;
    return target;
  };
  for (let tradingRule of tradingRules) {
    if (
      _.isEqual(source.features, tradingRule.sourceFeatures) &&
      _.isEqual(target.features, tradingRule.targetFeatures)
    ) {
      tradingFunction = tradingRule.action;
      break;
    }
  }
  return tradingFunction;
}
module.exports = trade;