const models = require('../models')

const foodrRegisterController = {
  // 全ての食材データ取得
  async getFoodData(req, res) {
    const allFoodData = await models.food.findAll().catch((error) => {
      res.status(404).send({ error: error.message })
    })
    console.log(allFoodData)
    res.status(200).send({ result: allFoodData })
  },
  // 食材データをDBに登録
  async registerFood(req, res) {
    // sessionがあればuser情報が格納される
    const user = req.user
    const food = req.body
    // 食材データを登録処理、成功でデータが格納される
    const createdFood = await models.food
      .create({
        userId: user.id,
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
    res.status(200).send({ message: '登録完了です', result: createdFood })
  },
  // 食材データの更新
  async updateFood(req, res) {
    console.log(req.params.id)
    console.log(req.body)
    const food = await models.food
      .findOne({
        where: { id: req.params.id }
      })
      .catch((error) => {
        console.log(error)
      })
    const updatedFood = await food
      .update({
        name: req.body.name,
        value: req.body.value,
        amount: req.body.amount,
        yield: req.body.yield,
        unit: req.body.unit,
        comment: req.body.comment,
        image: req.body.image,
        cost: req.body.cost
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).send({ error: error.message })
      })
    console.log(updatedFood)
    res.status(200).send({ message: '更新しました', result: updatedFood })
  },
  // 食材データを消去
  async deleteFood(req, res) {
    const food = await models.food
      .findOne({
        where: { id: req.params.id }
      })
      .catch((error) => {
        console.log(error)
      })
    // 取得したタスクを消去
    const deletedFood = await food.destroy({ force: true }).catch((error) => {
      console.log(error)
      res.status(404).send({ error: error.message })
    })
    res.status(200).send({ message: '削除しました', result: deletedFood })
  }
}

module.exports = foodrRegisterController
