const applyFeatures = require('./applyFeatures');
const battle = require('./battleMock');

function getUnitById(id) {
  return battle.units.find(unit => unit.id === id);
}

test('apply attack', () => {
  let unit = getUnitById('second1');
  expect(applyFeatures.applyAttackFeatures(unit)).toMatchObject({attack: 2, health: 2, features: ["POISON"], receivedDamage: 0});
});

test('apply attack', () => {
  let unit = getUnitById('third1');
  expect(applyFeatures.applyAttackFeatures(unit)).toMatchObject({attack: 1, health: 2, features: ["SHIELD"], receivedDamage: 0});
});
