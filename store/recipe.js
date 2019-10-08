export const state = () => ({
  recipes: [],
  // レシピの食材
  foodContents: []
})

export const mutations = {
  setRecipe(state, recipe) {
    state.recipes.push(recipe)
  },
  setFoodContents(state, food) {
    console.log('food')
    state.foodContents.push(food)
  }
}

export const getters = {
  recipes(state) {
    return state.recipes
  },
  foodContents(state) {
    return state.foodContents
  }
}

export const actions = {
  registerRecipe({ commit }, reqRecipeInfo) {
    commit('setRecipe', reqRecipeInfo)
  },
  // 食材データをレシピに追加
  addFoodToRecipe({ commit }, food) {
    console.log(food)
    commit('setFoodContents', food)
  }
}
