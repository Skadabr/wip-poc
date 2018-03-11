const targetingRules = require('./targetingRules');

function getTargetIdsByTargetRule(source, targetRule, battle) {
  let targetingFunction = findTargetRuleFunction(targetRule);
  return targetingFunction(source, battle);
}

function findTargetRuleFunction(targetRule) {
  let targetingRule = targetingRules.find(rule => rule.type === targetRule);
  return targetingRule.action;
}
module.exports = {getTargetIdsByTargetRule: getTargetIdsByTargetRule};