'use strict'
module.exports = (sequelize, DataTypes) => {
  const foodRecipe = sequelize.define(
    'food_recipe',
    {
      foodId: DataTypes.INTEGER,
      recipeId: DataTypes.STRING,
      foodName: DataTypes.STRING,
      foodAmount: DataTypes.STRING,
      foodUnit: DataTypes.STRING,
      foodAmountCost: DataTypes.STRING
    },
    {
      underscored: true
    }
  )
  foodRecipe.associate = function(models) {
    // associations can be defined here
    foodRecipe.belongsTo(models.food, { foreignKey: 'foodId' })
    foodRecipe.belongsTo(models.recipe, { foreignKey: 'recipeId' })
  }
  return foodRecipe
}
