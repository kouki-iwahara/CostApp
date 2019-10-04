export const state = () => ({
  recipes: []
})

export const mutations = {
  setRecipe(state, recipe) {
    state.recipes.push(recipe)
  }
}

export const getters = {
  recipes(state) {
    return state.recipes
  }
}

export const actions = {
  registerRecipe({ commit }, reqRecipeInfo) {
    commit('setRecipe', reqRecipeInfo)
  }
}
