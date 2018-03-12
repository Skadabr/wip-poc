const battle = {
  players: [
    {id: 'stan'},
    {id: 'rob'}
  ],
  units: [
    {
      id: 'hero1',
      owner: 'stan',
      position: 0,
      buffs: [],
      features: [],
    },
    {
      id: 'first1',
      owner: 'stan',
      position: 1,
      attack: 1,
      health: 2,
      receivedDamage: 0,
      features: [],
      buffs: [
        {
          target: 'ALL_FRIENDLY_MINIONS',
          feature: {
            type: 'ATTACK',
            value: 1
          }
        },
        {
          target: 'ALL_FRIENDLY_MINIONS',
          feature: {
            type: 'HEALTH',
            value: 1
          }
        }
      ]
    },
    {
      id: 'second1',
      owner: 'stan',
      position: 2,
      attack: 1,
      health: 2,
      receivedDamage: 0,
      buffs: [],
      features: [
        {
          type: "ATTACK",
          value: 1
        },
        "POISON"
      ]
    },
    {
      id: 'third1',
      owner: 'stan',
      position: 3,
      attack: 1,
      health: 2,
      receivedDamage: 0,
      buffs: [],
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
    },
    {
      id: 'hero2',
      owner: 'rob',
      position: 0,
      buffs: [],
      features: [],
    },
    {
      id: 'first2',
      owner: 'rob',
      position: 1,
      attack: 1,
      health: 2,
      receivedDamage: 0,
      buffs: [],
      features: []
    },
    {
      id: 'second2',
      owner: 'rob',
      position: 2,
      attack: 1,
      health: 2,
      receivedDamage: 0,
      buffs: [],
      features: ["SHIELD"],
    },
    {
      id: 'third2',
      owner: 'rob',
      position: 3,
      attack: 1,
      health: 2,
      receivedDamage: 0,
      buffs: [],
      features: [
        {
          type: 'HEALTH',
          value: 2
        }
      ],
    }
  ]
};

module.exports = battle;