'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('food_recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      food_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'food',
          key: 'id'
        }
      },
      recipe_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'recipes',
          key: 'id'
        }
      },
      food_name: {
        type: Sequelize.STRING
      },
      food_amount: {
        type: Sequelize.STRING
      },
      food_unit: {
        type: Sequelize.STRING
      },
      food_amount_cost: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('food_recipes')
  }
}
