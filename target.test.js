const target = require('./target');
const _ = require('lodash');

let battle;

beforeEach(() => {
  battle = _.cloneDeep(require('./battleMock'));
});

function getUnitById(id) {
  return battle.units.find(unit => unit.id === id);
}

test('target all characters', () => {
  let source = getUnitById('hero1');
  let targetRule = 'ALL_CHARACTERS';
  expect(target.getTargetIdsByTargetRule(source, targetRule, battle))
    .toEqual(["hero1", "first1", "second1", "third1", "hero2", "first2", "second2", "third2",]);
});

test('target all enemy characters', () => {
  let source = getUnitById('hero1');
  let targetRule = 'ALL_ENEMY_CHARACTERS';
  expect(target.getTargetIdsByTargetRule(source, targetRule, battle))
    .toEqual(["hero2", "first2", "second2", "third2",]);
});

test('target all enemy minions', () => {
  let source = getUnitById('hero1');
  let targetRule = 'ALL_ENEMY_MINIONS';
  expect(target.getTargetIdsByTargetRule(source, targetRule, battle))
    .toEqual(["first2", "second2", "third2"]);
});

test('target all friendly characters', () => {
  let source = getUnitById('hero1');
  let targetRule = 'ALL_FRIENDLY_CHARACTERS';
  expect(target.getTargetIdsByTargetRule(source, targetRule, battle))
    .toEqual(["hero1", "first1", "second1", "third1"]);
});

test('target all friendly minions', () => {
  let source = getUnitById('hero1');
  let targetRule = 'ALL_FRIENDLY_MINIONS';
  expect(target.getTargetIdsByTargetRule(source, targetRule, battle))
    .toEqual(["first1", "second1", "third1"]);
});

test('target other friendly minions', () => {
  let source = getUnitById('first1');
  let targetRule = 'OTHER_FRIENDLY_MINIONS';
  expect(target.getTargetIdsByTargetRule(source, targetRule, battle))
    .toEqual(["second1", "third1"]);
});

test('get available mil targets with no rules', () => {
  let source = getUnitById('first1');
  expect(target.getAvailableMilTargetIdsByAttacker(source, battle))
    .toEqual(["hero2", "first2", "second2", "third2"]);
});

test('get available mil targets with taunt', () => {
  let source = getUnitById('first1');
  let taunt = getUnitById('first2');
  taunt.features.push("TAUNT");
  expect(target.getAvailableMilTargetIdsByAttacker(source, battle))
    .toEqual(["first2"]);
});

test('get available mil targets with stealth', () => {
  let source = getUnitById('first1');
  let stealth = getUnitById('second2');
  stealth.features.push("STEALTH");
  expect(target.getAvailableMilTargetIdsByAttacker(source, battle))
    .toEqual(["hero2", "first2", "third2"]);
});

test('get available mil targets with taunt/stealth', () => {
  let source = getUnitById('first1');
  let stealthTaunt = getUnitById('second2');
  stealthTaunt.features = [...stealthTaunt.features, "STEALTH", "TAUNT"];
  expect(target.getAvailableMilTargetIdsByAttacker(source, battle))
    .toEqual(["hero2", "first2", "third2"]);
});


test('get available mil targets with taunt and taunt/stealth', () => {
  let source = getUnitById('first1');
  let taunt = getUnitById('first2');
  let stealthTaunt = getUnitById('second2');
  taunt.features.push("TAUNT");
  stealthTaunt.features = [...stealthTaunt.features, "STEALTH", "TAUNT"];
  expect(target.getAvailableMilTargetIdsByAttacker(source, battle))
    .toEqual(["first2"]);
});
