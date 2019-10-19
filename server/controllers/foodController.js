const models = require('../models')

const foodrRegisterController = {
  // 全ての食材データ取得
  async getFoodData(req, res) {
    const allFoodData = await models.food.findAll().catch((error) => {
      res.status(404).json({ error: error.message })
    })
    console.log(allFoodData)
    res.status(200).json({ result: allFoodData })
  },
  // 食材データをDBに登録
  async registerFood(req, res) {
    // sessionが切れていたらフロントに返す
    if (!req.user) {
      return res.json({ error: 'ユーザー認証が切れています' })
    }
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
    // sessionが切れていたらフロントに返す
    if (!req.user) {
      return res.json({ error: 'ユーザー認証が切れています' })
    }
    console.log(req.params.id)
    console.log(req.body)
    const food = await models.food
      .findOne({
        where: { id: req.params.id }
      })
      .catch((error) => {
        console.log(error.message)
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
    if (!req.user) {
      return res.json({ error: 'ユーザー認証が切れています' })
    }
    // レシピに登録されていた食材を取得
    const foodRecipes = await models.foodRecipe
      .findAll({ where: { foodId: req.params.id } })
      .catch((error) => {
        console.log(error)
        return res.status(404).json({ error: error.message })
      })
    console.log('食材', foodRecipes)
    // 取得したレシピ食材があるなら削除
    if (foodRecipes) {
      await foodRecipes.forEachAsync(async (foodrecipe) => {
        const deletedFoodRecipe = await foodrecipe
          .destroy({ force: true })
          .catch((error) => {
            console.log(error)
            res.status(404).json({ error: error.message })
          })
        console.log('食材消す', deletedFoodRecipe)
      })
    }
    // 食材データを削除
    const food = await models.food
      .findOne({
        where: { id: req.params.id }
      })
      .catch((error) => {
        console.log(error)
        res.status(404).json({ error: error.message })
      })
    // 取得したタスクを消去
    const deletedFood = await food.destroy({ force: true }).catch((error) => {
      console.log(error)
      res.status(404).json({ error: error.message })
    })
    res.status(200).json({ message: '削除しました', result: deletedFood })
  }
}

module.exports = foodrRegisterController
