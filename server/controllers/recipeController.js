require('array-foreach-async')
const models = require('../models')

const recipeController = {
  // レシピ情報を登録
  async registerRecipe(req, res) {
    // sessionがあればreq.userにuser情報が格納される
    const user = req.user
    const recipe = req.body
    // レシピテーブルにデータを登録、成功でデータが格納される
    const createdRecipe = await models.recipe
      .create({
        userId: user.id,
        name: recipe.name,
        value: recipe.value,
        cost: recipe.cost,
        costRate: recipe.costRate,
        comment: recipe.comment,
        image: recipe.image
      })
      .catch((error) => {
        console.log(error.message)
        res.status(404).send({ error: error.message })
      })
    console.log(createdRecipe)
    // 食材を選んでいなかったらそのままフロントに返す
    if (!recipe.foods) {
      // 成功でレシピデータを返す
      res.status(200).send({ message: '登録完了です', result: createdRecipe })
      return
    }
    // ここから
    // req.body.foodsは、食材を複数選んでいたら配列、１つなら連想配列になっている
    // 食材を複数選んでいた場合
    if (Array.isArray(recipe.foods)) {
      const foodContents = []
      // recipe.foodsが文字列なのでJSON.parse()で値を参照できるように構築
      recipe.foods.forEach((food) => {
        const jsonFood = JSON.parse(food)
        foodContents.push(jsonFood)
      })
      // 登録されたレシピ食材を格納する
      const foodRecipeData = []
      // レシピ食材を登録
      await foodContents.forEachAsync(async (foodContent) => {
        const createdFoodContent = await models.foodRecipe
          .create({
            userId: user.id,
            foodId: foodContent.id,
            recipeId: createdRecipe.id,
            foodName: foodContent.name,
            foodAmount: foodContent.amount,
            foodUnit: foodContent.unit,
            foodAmountCost: foodContent.amountCost
          })
          .catch((error) => {
            console.log(error.message)
            res.status(404).send({ error: error.message })
          })
        foodRecipeData.push(createdFoodContent.dataValues)
      })
      // 先程登録されたレシピにレシピ食材を格納
      createdRecipe.dataValues.foods = foodRecipeData.slice()
    }
    // 食材を一つだけ選んだ場合
    else {
      const jsonFood = JSON.parse(recipe.foods)
      // レシピ食材を登録
      const createdFoodContent = await models.foodRecipe
        .create({
          userId: user.id,
          foodId: jsonFood.id,
          recipeId: createdRecipe.id,
          foodName: jsonFood.name,
          foodAmount: jsonFood.amount,
          foodUnit: jsonFood.unit,
          foodAmountCost: jsonFood.amountCost
        })
        .catch((error) => {
          console.log(error.message)
          res.status(404).send({ error: error.message })
        })
      // 先程登録されたレシピにレシピ食材を格納
      createdRecipe.dataValues.foods = createdFoodContent
    }
    // レシピとレシピ食材を纏めたデータがフロントに返される
    res.status(200).send({
      message: '登録完了です',
      result: createdRecipe
    })
  },
  // レシピデータを取得
  async getRecipes(req, res) {
    // userIdに紐づけられているレシピとレシピ食材を取得
    const recipes = await models.user
      .findOne({
        where: { id: req.user.id },
        include: [
          {
            model: models.recipe,
            required: false
          },
          {
            model: models.foodRecipe,
            required: false
          }
        ]
      })
      .catch((error) => {
        res.status(404).json({ error: error.message })
      })
    res.status(200).json({ result: recipes })
  }
}

module.exports = recipeController
