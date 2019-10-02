import querystring from 'querystring'

export const state = () => ({
  foods: []
})

export const mutations = {
  setFood(state, food) {
    state.foods.push(food)
  }
}

export const getters = {
  foods(state) {
    return state.foods
  }
}

export const actions = {
  async registerFood({ commit }, reqFoodInfo) {
    console.log(reqFoodInfo)
    const res = await this.$axios
      .$post('/foodRegisterPage', querystring.stringify(reqFoodInfo))
      .catch((error) => {
        console.log(error.message)
      })
    commit('setFood', res)
    return res
  }
}
