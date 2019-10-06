import querystring from 'querystring'

export const state = () => ({})

export const mutations = {}

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
  }
}
