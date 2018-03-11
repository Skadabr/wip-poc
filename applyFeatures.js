const target = require('./target');
const _ = require('lodash');

function applyBuffs(battle) {
  let buffers = battle.units.filter(unit => unit.buffs.length > 0);
  buffers.forEach(buffer => {
    buffer.buffs.forEach(buff => {
      let targets = target.getTargetsByTargetRule(buffer, buff.target, battle);
      targets.forEach(target => {
        target.features = [... new Set([...target.features, buff.feature])];
      })
    })
  })
}

function applyAttackFeatures(unit) {
  let attackFeatures = unit.features.filter(feature => ["ATTACK"].includes(feature.type));
  unit.features = unit.features.filter(feature => !["ATTACK"].includes(feature.type));
  for (let feature of attackFeatures) {
    unit.attack += feature.value;
  }
  return unit;
}

module.exports = {applyAttackFeatures:applyAttackFeatures, applyBuffs: applyBuffs};