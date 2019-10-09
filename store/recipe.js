export const state = () => ({
  // レシピの食材
  foodContents: []
})

export const mutations = {
  setFoodContents(state, food) {
    state.foodContents.push(food)
  },
  deleteFood(state, index) {
    state.foodContents.splice(index, 1)
  }
}

export const getters = {
  foodContents(state) {
    return state.foodContents
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
  }
}
