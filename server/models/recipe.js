'use strict'
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define(
    'recipe',
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
      costRate: DataTypes.DECIMAL,
      comment: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      underscored: true
    }
  )
  recipe.associate = function(models) {
    // associations can be defined here
    recipe.belongsTo(models.user)
    recipe.belongsToMany(models.food, {
      through: 'food_recipe',
      foreignKey: 'recipeId'
    })
  }
  return recipe
}
