require('array-foreach-async')
const models = require('../models')

const recipeController = {
  // レシピ情報を登録
  async registerRecipe(req, res) {
    // sessionが切れていたらフロントに返す
    if (!req.user) {
      return res.json({ error: 'ユーザー認証が切れています' })
    }
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
    // ここからfoodRecipeテーブルの処理
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
            foodName: foodContent.foodName,
            foodAmount: foodContent.foodAmount,
            foodUnit: foodContent.foodUnit,
            foodAmountCost: foodContent.foodAmountCost
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
          foodName: jsonFood.foodName,
          foodAmount: jsonFood.foodAmount,
          foodUnit: jsonFood.foodUnit,
          foodAmountCost: jsonFood.foodAmountCost
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
    // sessionが切れていたらフロントに返す
    if (!req.user) {
      return res.json({ error: 'ユーザー認証が切れています' })
    }
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
  },
  // レシピの更新
  async updateRecipe(req, res) {
    // sessionが切れていたらフロントに返す
    if (!req.user) {
      return res.json({ error: 'ユーザー認証が切れています' })
    }
    console.log(req.params.id)
    console.log(req.body)
    // 更新するレシピを取得
    const recipe = await models.recipe
      .findOne({ where: { id: req.params.id } })
      .catch((error) => {
        console.log(error.message)
      })
    // 更新処理
    const updatedRecipe = await recipe
      .update({
        name: req.body.name,
        value: req.body.value,
        cost: req.body.cost,
        costRate: req.body.costRate,
        comment: req.body.comment,
        image: req.body.image
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json({ error: error.message })
      })
    console.log(updatedRecipe)
    // 食材を選んでいなかったらこのままフロントへ返す
    if (!req.body.foods) {
      // 成功でレシピデータを返す
      res.status(200).json({ message: '更新しました', result: updatedRecipe })
      return
    }
    // レシピ食材更新処理
    // レシピ食材をjsonからオブジェクトに戻し格納される
    const recipeFoods = []
    // updateされたレシピ食材が格納される
    const updatedFoodRecipes = []
    // updateするレシピ食材をjsonからオブジェクトに戻す
    // 食材を複数選んでいたら配列、１つなら連想配列になっている
    if (!Array.isArray(req.body.foods)) {
      const jsonFood = JSON.parse(req.body.foods)
      recipeFoods.push(jsonFood)
    } else {
      req.body.foods.forEach((food) => {
        const jsonFood = JSON.parse(food)
        recipeFoods.push(jsonFood)
      })
    }
    // 現在登録されているレシピの食材を抽出
    const registeredFoods = await models.foodRecipe
      .findAll({ where: { recipeId: recipe.id } })
      .catch((error) => {
        console.log(error)
        return res.status(404).json({ error: error.message })
      })
    console.log(registeredFoods)
    // リクエストされたレシピ食材と、登録されているレシピ食材の中から一致している物を探す
    await recipeFoods.forEachAsync(async (recipeFood) => {
      const matchedFood = await registeredFoods.find((registeredFood) => {
        console.log(registeredFood)
        // 食材idが一致すればmatchedFoodに格納
        return registeredFood.foodId === recipeFood.foodId
      })
      console.log(matchedFood)
      // リクエストと一致している食材があるなら更新、無ければ新規作成する
      // 更新処理
      if (matchedFood) {
        const updatedFoodRecipe = await matchedFood
          .update({
            foodAmount: recipeFood.foodAmount
          })
          .catch((error) => {
            console.log(error)
            return res.status(404).json({ error: error.message })
          })
        console.log('updatedFoodRecipe: ', updatedFoodRecipe)
        updatedFoodRecipes.push(updatedFoodRecipe)
      } else {
        // 新規作成処理
        console.log(recipeFood)
        const createdFoodRecipe = await models.foodRecipe.create({
          userId: req.user.id,
          foodId: recipeFood.foodId,
          recipeId: recipe.id,
          foodName: recipeFood.foodName,
          foodAmount: recipeFood.foodAmount,
          foodUnit: recipeFood.foodUnit,
          foodAmountCost: recipeFood.foodAmountCost
        })
        console.log('createdFoodRecipe: ', createdFoodRecipe)
        updatedFoodRecipes.push(createdFoodRecipe)
      }
    })
    // 登録されているレシピ食材が、リクエストされた食材と一致しなかったら削除する
    await registeredFoods.forEachAsync(async (registeredFood) => {
      // 食材idが一致すればmatchedFoodに格納
      const matchedFood = await recipeFoods.find((recipeFood) => {
        return recipeFood.foodId === registeredFood.foodId
      })
      // 食材と一致しなかった場合の削除処理
      if (!matchedFood) {
        console.log(registeredFood)
        // 削除するレシピ食材を取得
        const food = await models.foodRecipe
          .findOne({
            where: { id: registeredFood.id }
          })
          .catch((error) => {
            console.log(error)
            res.status(404).json({ error: error.message })
          })
        // 削除処理
        const deletedFoodRecipe = await food
          .destroy({ force: true })
          .catch((error) => {
            console.log(error)
            res.status(404).json({ error: error.message })
          })
        console.log(deletedFoodRecipe)
      }
    })
    console.log(updatedFoodRecipes)
    // 更新されたレシピに食材データを格納しフロントに返す
    updatedRecipe.dataValues.foods = updatedFoodRecipes
    res.status(200).json({ message: '更新しました', result: updatedRecipe })
  },
  // レシピと登録してある食材を削除
  async deleteRecipe(req, res) {
    // sessionが切れていたらフロントに返す
    if (!req.user) {
      return res.json({ error: 'ユーザー認証が切れています' })
    }
    console.log(req.params.id)
    // レシピに登録されていた食材を取得
    const foodRecipes = await models.foodRecipe
      .findAll({ where: { recipeId: req.params.id } })
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
            res.status(404).send({ error: error.message })
          })
        console.log('食材消す', deletedFoodRecipe)
      })
    }
    // 削除するレシピの取得
    const recipe = await models.recipe
      .findOne({
        where: { id: req.params.id }
      })
      .catch((error) => {
        console.log(error)
        res.status(404).send({ error: error.message })
      })
    // 取得したレシピを削除
    const deletedRecipe = await recipe
      .destroy({ force: true })
      .catch((error) => {
        console.log(error)
        res.status(404).send({ error: error.message })
      })
    console.log(deletedRecipe)
    res.status(200).send({ message: '削除しました', result: deletedRecipe })
  },
  // ユーザー全ての公開レシピデータを取得
  async getAllUsersRecipes(req, res) {
    const recipes = await models.recipe.findAll().catch((error) => {
      res.status(404).json({ error: error.message })
    })
    // レシピに紐づいている食材データを取得し格納する
    await recipes.forEachAsync(async (recipe) => {
      const foodRecipes = await models.foodRecipe
        .findAll({
          where: { recipeId: recipe.id }
        })
        .catch((error) => {
          res.status(404).json({ error: error.message })
        })
      recipe.dataValues.foods = foodRecipes.slice()
    })
    res.status(200).json({ result: recipes })
  }
}

module.exports = recipeController
