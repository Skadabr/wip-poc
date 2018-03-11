const target = require('./target');

let battle = {
  players: [
    {id: 'stan'},
    {id: 'rob'}
  ],
  units: [
    {
      id: 'hero1',
      owner: 'stan',
      position: 0
    },
    {
      id: 'first1',
      owner: 'stan',
      position: 1
    },
    {
      id: 'second1',
      owner: 'stan',
      position: 2
    },
    {
      id: 'third1',
      owner: 'stan',
      position: 3
    },
    {
      id: 'hero2',
      owner: 'rob',
      position: 0
    },
    {
      id: 'first2',
      owner: 'rob',
      position: 1
    },
    {
      id: 'second2',
      owner: 'rob',
      position: 2
    },
    {
      id: 'third2',
      owner: 'rob',
      position: 3
    }
  ]
};

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
