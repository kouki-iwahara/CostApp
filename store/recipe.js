import querystring from 'querystring'

export const state = () => ({
  allUsersRecipes: [],
  // レシピのデータ
  recipes: []
})

export const mutations = {
  setRecipes(state, recipes) {
    state.recipes = recipes.slice()
  },
  addRecipes(state, recipe) {
    state.recipes.push(recipe)
  },
  setAllUsersRecipes(state, recipes) {
    state.allUsersRecipes = recipes.slice()
  }
}

export const getters = {
  recipes(state) {
    return state.recipes
  },
  allUsersRecipes(state) {
    return state.allUsersRecipes
  }
}

export const actions = {
  // レシピデータを登録
  async registerRecipe({ commit }, reqRecipe) {
    const res = await this.$axios
      .$post('/recipe', querystring.stringify(reqRecipe))
      .catch((error) => {
        console.log(error.message)
      })
    console.log(res)
    // stateに格納
    commit('addRecipes', res.result)
    return res
  },
  // ユーザーのレシピデータ取得
  async getRecipeData({ commit }) {
    // 全てのレシピデータとレシピの食材が格納される
    const res = await this.$axios.$get('/recipe/user').catch((error) => {
      console.log(error.message)
    })
    if (res.error) {
      return res
    }
    const allRecipes = res.result.recipes.slice()
    const foodRecipes = res.result.foodRecipes.slice()
    // レシピとレシピ食材データがある場合
    if (allRecipes && foodRecipes) {
      // 変更ボタンの値とレシピに対応する食材を取得、格納
      allRecipes.forEach((recipe) => {
        recipe.updateBtn = '変更'
        // レシピに対応する食材を取得
        const foodData = foodRecipes.filter((foodContent) => {
          return recipe.id === foodContent.recipeId
        })
        // 食材が取得できたら格納
        if (foodData) {
          recipe.foods = foodData.slice()
        }
      })
    }
    // stateに食材データを格納
    commit('setRecipes', allRecipes)
    return res
  },
  async updateRecipe({ ctx }, recipe) {
    console.log(recipe)
    // 成功で更新された食材が格納される
    const res = await this.$axios
      .$put(`/recipe/${recipe.id}`, querystring.stringify(recipe))
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
    return res
  },
  // 食材の削除
  async deleteRecipe({ ctx }, recipeId) {
    console.log(recipeId)
    // 成功で削除された食材が格納される
    const res = await this.$axios
      .$delete(`/recipe/${recipeId}`)
      .catch((error) => {
        console.log(error.message)
      })
    console.log(res)
    return res
  },
  // ユーザー全員の公開レシピ取得
  async getAllUsersRecipes({ commit }) {
    // 全てのレシピデータとレシピの食材が格納される
    const res = await this.$axios.$get('/recipe/allRecipes').catch((error) => {
      console.log(error.message)
    })
    console.log(res)
    // res.resultがない場合も作る

    // stateに食材データを格納
    commit('setAllUsersRecipes', res.result)
    return res
  }
}
