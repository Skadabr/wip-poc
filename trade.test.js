const _ = require('lodash');

const applyFeatures = require('./applyFeatures');
const trade = require('./trade');
let battle;

function getUnitById(id) {
  return _.cloneDeep(battle.units.find(unit => unit.id === id));
}

beforeEach(() => {
  battle = _.cloneDeep(require('./battleMock'));
});

test('no features', () => {
  applyFeatures.applyBuffs(battle);
  let source = getUnitById('first1');
  let rawSource = applyFeatures.applyAttackFeatures(source);
  let target = getUnitById('first2');
  expect(trade(rawSource, target)).toMatchObject({attack:1, health:2, features: [], receivedDamage: 2});
});

test('target shield', () => {
  applyFeatures.applyBuffs(battle);
  let source = getUnitById('first1');
  let rawSource = applyFeatures.applyAttackFeatures(source);
  let target = getUnitById('second2');
  expect(trade(rawSource, target)).toMatchObject({attack:1, health:2, features: [], receivedDamage: 0});
});

test('source poison, target shield', () => {
  applyFeatures.applyBuffs(battle);
  let source = getUnitById('second1');
  let rawSource = applyFeatures.applyAttackFeatures(source);
  let target = getUnitById('second2');
  expect(trade(rawSource, target)).toMatchObject({attack:1, health:2, features: [], receivedDamage: 0});
});

test('source poison', () => {
  let source = getUnitById('second1');
  let rawSource = applyFeatures.applyAttackFeatures(source);
  let target = getUnitById('first2');
  expect(trade(rawSource, target)).toMatchObject({attack:1, health:0, features: [], receivedDamage: 0});
});

test('target +2 health', () => {
  applyFeatures.applyBuffs(battle);
  let source = getUnitById('first1');
  let rawSource = applyFeatures.applyAttackFeatures(source);
  let target = getUnitById('third2');
  expect(trade(rawSource, target)).toMatchObject({attack:1, health:2, features: [{type:"HEALTH",value:2}], receivedDamage: 2});
});

