import querystring from 'querystring'
import firebase from '@/plugins/firebase'

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
  // 画像をアップロード
  async upLoadImage(ctx, file) {
    const storageRef = firebase.storage().ref()
    // アップロードされた画像データを格納
    const upLoadedImageData = await storageRef
      .child(`images/${file.name}`)
      .put(file)
    return upLoadedImageData
  },
  // 画像のダウンロードURLを取得
  async getDownloadURL({ commit }, file) {
    const storageRef = firebase.storage().ref()
    // アップロードされた画像URLを格納
    const url = await storageRef.child(`images/${file}`).getDownloadURL()
    return url
  },
  // DBに食材を登録しstateにデータ格納
  async registerFood({ commit }, reqFoodInfo) {
    console.log(reqFoodInfo)
    // DBに登録
    const res = await this.$axios
      .$post('/foodRegisterPage', querystring.stringify(reqFoodInfo))
      .catch((error) => {
        console.log(error.message)
      })
    console.log(res)
    // 食材データが返ってくればstateに格納
    if (res.food) {
      commit('setFood', res.food)
    }
    return res
  }
}
