const targetingRules = [
  {
    type: 'ALL_CHARACTERS',
    action: function (source, battle) {
      return battle.units.map(unit => unit.id);
    }
  },
  {
    type: 'ALL_ENEMY_CHARACTERS',
    action: function (source, battle) {
      return battle.units.filter(unit => unit.owner !== source.owner)
        .map(unit => unit.id)
    }
  },
  {
    type: 'ALL_ENEMY_MINIONS',
    action: function (source, battle) {
      return battle.units.filter(unit => unit.owner !== source.owner)
        .filter(unit => unit.position !== 0)
        .map(unit => unit.id)
    }
  },
  {
    type: 'ALL_FRIENDLY_CHARACTERS',
    action: function (source, battle) {
      return battle.units.filter(unit => unit.owner === source.owner)
        .map(unit => unit.id)
    }
  },
  {
    type: 'ALL_FRIENDLY_MINIONS',
    action: function (source, battle) {
      return battle.units.filter(unit => unit.owner === source.owner)
        .filter(unit => unit.position !== 0)
        .map(unit => unit.id)
    }
  },
  {
    type: 'OTHER_FRIENDLY_MINIONS',
    action: function (source, battle) {
      return battle.units.filter(unit => unit.owner === source.owner)
        .filter(unit => unit.position !== 0)
        .filter(unit => unit.id !== source.id)
        .map(unit => unit.id)
    }
  }
];

module.exports = targetingRules;