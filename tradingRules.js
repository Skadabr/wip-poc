const tradingRules = [
  {
    sourceFeatures: [],
    targetFeatures: [],
    action: function (source, target) {
      target.receivedDamage += source.attack;
      return target;
    }
  },
  {
    sourceFeatures: [],
    targetFeatures: ["SHIELD"],
    action: function (source, target) {
      target.features = target.features.filter(f => f !== "SHIELD");
      return target;
    }
  },
  {
    sourceFeatures: ["POISON"],
    targetFeatures: ["SHIELD"],
    action: function (source, target) {
      target.features = target.features.filter(f => f !== "SHIELD");
      return target;
    }
  },
  {
    sourceFeatures: ["POISON"],
    targetFeatures: [],
    action: function (source, target) {
      target.health = 0;
      return target;
    }
  }
];

module.exports = tradingRules;