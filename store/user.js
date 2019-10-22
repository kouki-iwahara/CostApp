import querystring from 'querystring'

export const state = () => ({
  user: ''
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}

export const actions = {
  // signupのpost処理結果をフロントに返す
  async signUp({ ctx }, reqUserInfo) {
    console.log(reqUserInfo)
    // signup処理の結果が格納される
    const res = await this.$axios
      .$post('/signup', querystring.stringify(reqUserInfo))
      .catch((error) => {
        console.log(error.message)
      })
    return res
  },
  async signIn({ commit }, reqUserInfo) {
    const res = await this.$axios
      .$post('/signin', querystring.stringify(reqUserInfo))
      .catch((error) => {
        console.log(error.message)
      })
    console.log(res)
    commit('setUser', res.userId)
    return res
  },
  async signOut({ commit }) {
    const res = await this.$axios.post('/signout').catch((error) => {
      console.log(error)
    })
    console.log(res)
    commit('setUser', '')
  }
}
