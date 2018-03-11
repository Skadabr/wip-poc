const targetingRules = require('./targetingRules');

function getTargetIdsByTargetRule(source, targetRule, battle) {
  let targetingFunction = findTargetRuleFunction(targetRule);
  return targetingFunction(source, battle);
}
function getTargetsByTargetRule(source, targetRule, battle) {
  let unitIds = getTargetIdsByTargetRule(source, targetRule, battle);
  return unitIds.map(id => getUnitById(id, battle))
}

function findTargetRuleFunction(targetRule) {
  let targetingRule = targetingRules.find(rule => rule.type === targetRule);
  return targetingRule.action;
}

function getUnitById(id, battle) {
  return battle.units.find(unit => unit.id === id);
}
module.exports = {getTargetIdsByTargetRule: getTargetIdsByTargetRule, getTargetsByTargetRule: getTargetsByTargetRule};