import querystring from 'querystring'

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
  async signIn({ ctx }, reqUserInfo) {
    const res = await this.$axios
      .$post('/signin', querystring.stringify(reqUserInfo))
      .catch((error) => {
        console.log(error.message)
      })
    return res
  },
  // ユーザー認証確認
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
