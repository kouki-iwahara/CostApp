export const actions = {
  // 認証確認
  async nuxtClientInit({ rootState, commit }, { redirect }) {
    const res = await this.$axios.get('/auth').catch((error) => {
      console.log(error)
    })
    console.log(res)
    commit('user/setUser', res.data.result)
    console.log(rootState.user.user)
  }
}
