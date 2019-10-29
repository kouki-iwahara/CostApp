export const actions = {
  // 認証確認
  async nuxtClientInit({ rootState, dispatch, commit }) {
    await dispatch('recipe/getAllUsersRecipes').catch((error) => {
      console.log(error)
    })
    const res = await this.$axios.get('/auth').catch((error) => {
      console.log(error)
    })
    console.log(res)
    commit('user/setUser', res.data.result)
    console.log(rootState.user.user)
  }
}
