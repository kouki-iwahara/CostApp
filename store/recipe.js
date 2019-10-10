import querystring from 'querystring'

export const state = () => ({
  // レシピの食材
  foodContents: [],
  // レシピのデータ
  recipes: []
})

export const mutations = {
  setFoodContents(state, food) {
    state.foodContents.push(food)
  },
  deleteFood(state, index) {
    state.foodContents.splice(index, 1)
  },
  setRecipes(state, recipe) {
    state.recipes.push(recipe)
  }
}

export const getters = {
  foodContents(state) {
    return state.foodContents
  },
  recipes(state) {
    return state.recipes
  }
}

export const actions = {
  // 食材データをテーブルに追加
  addFoodToRecipe({ commit }, food) {
    console.log(food)
    commit('setFoodContents', food)
  },
  // 食材データをテーブルから削除
  deleteFood({ commit }, index) {
    commit('deleteFood', index)
  },
  // レシピデータを登録
  async registerRecipe({ commit }, reqRecipe) {
    const res = await this.$axios
      .$post('/recipe', querystring.stringify(reqRecipe))
      .catch((error) => {
        console.log(error.message)
      })
    console.log(res)
    // stateに格納
    commit('setRecipes', res.result)
    return res
  }
}
