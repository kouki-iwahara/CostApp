'use strict'
module.exports = (sequelize, DataTypes) => {
  const foods = sequelize.define(
    'foods',
    {
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
  foods.associate = function(models) {
    // associations can be defined here
  }
  return foods
}
