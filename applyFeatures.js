const tradingRules = require('./tradingRules');
const _ = require('lodash');

function applyFeatures(unit, battle) {
  let tradingFunction = function (source, target) {
    target.receivedDamage += source.attack;
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

// function applyBuffs()

function applyAttackFeatures(unit) {
  let attackFeatures = unit.features.filter(feature => ["ATTACK"].includes(feature.type));
  unit.features = unit.features.filter(feature => !["ATTACK"].includes(feature.type));
  for (let feature of attackFeatures) {
    unit.attack += feature.value;
  }
  return unit;
}

function applyBattleFeatures(unit, battle) {

}


module.exports = {applyAttackFeatures:applyAttackFeatures, applyBattleFeatures: applyBattleFeatures};