'use strict'
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      underscored: true
    }
  )
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.food, { foreignKey: 'userId' })
    user.hasMany(models.recipe, { foreignKey: 'userId' })
  }
  return user
}
