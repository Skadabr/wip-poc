const _ = require('lodash');
const targetingRules = require('./targetingRules');
const applyFeatures = require('./applyFeatures');

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

function getAvailableMilTargetsByAttacker(source, battle) {
  let targetRule = 'ALL_ENEMY_CHARACTERS';
  battle = _.cloneDeep(battle);
  // applyFeatures.applyBuffs(battle);
  let allEnemyCharacters = getTargetsByTargetRule(source, targetRule, battle);
  let nonStealthUnits = allEnemyCharacters.filter(unit => !unit.features.includes("STEALTH"));
  let tautUnits = nonStealthUnits.filter(unit => unit.features.includes("TAUNT"));
  return tautUnits.length > 0 ? tautUnits : nonStealthUnits;
}

function getAvailableMilTargetIdsByAttacker(source, battle) {
  let units = getAvailableMilTargetsByAttacker(source, battle);
  return units.map(unit => unit.id);
}

function getUnitById(id, battle) {
  return battle.units.find(unit => unit.id === id);
}
module.exports = {
  getTargetIdsByTargetRule: getTargetIdsByTargetRule,
  getTargetsByTargetRule: getTargetsByTargetRule,
  getAvailableMilTargetIdsByAttacker: getAvailableMilTargetIdsByAttacker
};