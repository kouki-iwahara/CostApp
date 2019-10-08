'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('food', [
      {
        user_id: 1,
        name: '玉ねぎ',
        value: 100,
        amount: '100',
        yield: '100',
        unit: 'g',
        cost: 10.0,
        comment: '美味しい',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        name: 'きゅうり',
        value: 100,
        amount: '45',
        yield: '100',
        unit: 'g',
        cost: 103.6,
        comment: 'まずい',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('food', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
