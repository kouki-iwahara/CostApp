'use strict'
module.exports = (sequelize, DataTypes) => {
  const food = sequelize.define(
    'food',
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      amount: DataTypes.STRING,
      yield: DataTypes.STRING,
      unit: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
      comment: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      underscored: true
    }
  )
  food.associate = function(models) {
    // associations can be defined here
    food.belongsTo(models.user)
    food.belongsToMany(models.recipe, {
      through: 'food_recipde',
      foreignKey: 'foodId'
    })
  }
  return food
}
