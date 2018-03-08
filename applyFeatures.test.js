const applyFeatures = require('./applyFeatures');

test('apply attack', () => {
  let unit = {
    attack: 1,
    health: 2,
    receivedDamage: 0,
    features: [
      {
        type: "ATTACK",
        value: 1
      }
    ]
  };
  expect(applyFeatures.applyAttackFeatures(unit)).toEqual({attack: 2, health: 2, features: [], receivedDamage: 0});
});

test('apply attack', () => {
  let unit = {
    attack: 1,
    health: 2,
    receivedDamage: 0,
    features: [
      "SHIELD",
      {
        type: "ATTACK",
        value: 1
      },
      {
        type: "ATTACK",
        value: -1
      },
    ]
  };
  expect(applyFeatures.applyAttackFeatures(unit)).toEqual({attack: 1, health: 2, features: ["SHIELD"], receivedDamage: 0});
});

test('apply battle features', () => {
  let battle = {
    players: [
      {
        units: [
          {
            features: [
              {
                type:"FRIENDLY_HEALTH_BUFF",
                value: 2
              },
              {
                type:"FRIENDLY_ATTACK_BUFF",
                value: 2
              }
            ]
          }
        ]
      },
      {
        units: []
      }
    ]
  };
  let unit = {
    attack: 1,
    health: 2,
    receivedDamage: 0,
    features: []
  };
  expect(applyFeatures.applyBattleFeatures(unit, battle)).toEqual({
    attack: 1,
    health: 2,
    features: [],
    receivedDamage: 0
  });
})
;
