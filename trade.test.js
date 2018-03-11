const _ = require('lodash');

const applyFeatures = require('./applyFeatures');
const trade = require('./trade');
const battle = require('./battleMock');

function getUnitById(id) {
  return _.cloneDeep(battle.units.find(unit => unit.id === id));
}

test('no features', () => {
  let source = getUnitById('first1');
  let target = getUnitById('first2');
  expect(trade(source, target)).toMatchObject({attack:1, health:2, features: [], receivedDamage: 1});
});

test('target shield', () => {
  let source = getUnitById('first1');
  let target = getUnitById('second2');
  expect(trade(source, target)).toMatchObject({attack:1, health:2, features: [], receivedDamage: 0});
});

test('source poison, target shield', () => {
  let source = getUnitById('second1');
  let rawSource = applyFeatures.applyAttackFeatures(source);
  let target = getUnitById('second2');
  expect(trade(rawSource, target)).toMatchObject({attack:1, health:2, features: []});
});

test('source poison', () => {
  let source = {
    health: 2,
    attack: 1,
    features: ["POISON"]
  };
  let target = {
    health: 2,
    attack: 1,
    features:[]
  };
  expect(trade(source, target)).toEqual({attack:1, health:0, features: []});
});

test('target +2 health', () => {
  let source = {
    attack: 1,
    health: 2,
    receivedDamage:0,
    features: []
  };
  let target = {
    attack: 1,
    health: 2,
    receivedDamage:0,
    features:[
      {health:2}
    ]
  };
  expect(trade(source, target)).toEqual({attack:1, health:2, features: [{health:2}], receivedDamage:1});
});

