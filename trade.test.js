const trade = require('./trade');

test('no features', () => {
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
    features:[]
  };
  expect(trade(source, target)).toEqual({attack:1, health:2, features: [], receivedDamage: 1});
});

test('target shield', () => {
  let source = {
    health: 2,
    attack: 1,
    features: []
  };
  let target = {
    health: 2,
    attack: 1,
    features:["SHIELD"]
  };
  expect(trade(source, target)).toEqual({attack:1, health:2, features: []});
});

test('source poison, target shield', () => {
  let source = {
    health: 2,
    attack: 1,
    features: ["POISON"]
  };
  let target = {
    health: 2,
    attack: 1,
    features:["SHIELD"]
  };
  expect(trade(source, target)).toEqual({attack:1, health:2, features: []});
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

