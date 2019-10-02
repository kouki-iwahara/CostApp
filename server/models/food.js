'use strict'
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define(
    'food',
    {
      foodId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      amount: DataTypes.STRING,
      yield: DataTypes.STRING,
      unit: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
      comment: DataTypes.STRING
    },
    {
      underscored: true
    }
  )
  food.associate = function(models) {
    // associations can be defined here
  }
  return food
}
