export const state = () => ({
  user: ''
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const getters = {}

export const actions = {
  async authenticator({ commit }) {
    const res = await this.$axios.get('/auth').catch((error) => {
      console.log(error)
    })
    if (res.data.result) {
      console.log(res.data.result)
      commit('setUser', res.data.result)
    }
  }
}
