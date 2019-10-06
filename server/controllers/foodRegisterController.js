const models = require('../models')

const foodrRegisterController = {
  // 食材データをDBに登録
  async registerFood(req, res) {
    // sessionがあればuser情報が格納される
    const user = req.user
    const food = req.body
    console.log(food)
    // 食材データを登録処理、成功でデータが格納される
    const createdFood = await models.foods
      .create({
        userId: user.userId,
        name: food.name,
        value: food.value,
        amount: food.amount,
        yield: food.yield,
        unit: food.unit,
        comment: food.comment,
        image: food.image,
        cost: food.cost
      })
      .catch((error) => {
        console.log(error.message)
        res.status(404).send({ error: error.message })
      })
    console.log(createdFood)
    // 成功で食材データを返す
    res.status(200).send({ message: '登録完了です', food: createdFood })
  }
}

module.exports = foodrRegisterController
