import querystring from 'querystring'
import firebase from '@/plugins/firebase'

export const state = () => ({
  foods: []
})

export const mutations = {
  // 全ての食材をstateに格納
  setFoods(state, allFoodData) {
    state.foods = allFoodData.slice()
  },
  // 食材を追加
  addFood(state, food) {
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
  // 全ての食材データ取得
  async getFoodData({ commit }) {
    // 全ての食材データが格納される
    const res = await this.$axios.$get('/food').catch((error) => {
      console.log(error.message)
    })
    console.log(res)
    // ユーザー認証が切れていたら格納されている
    if (res.error) {
      return res
    }
    // 変更ボタンを付与
    const allFoodData = res.result.slice()
    if (allFoodData) {
      allFoodData.forEach((food) => {
        food.updateBtn = '変更'
      })
    }
    // stateに食材データを格納
    commit('setFoods', allFoodData)
    return res
  },
  // DBに食材を登録しstateにデータ格納
  async registerFood({ commit }, reqFoodInfo) {
    console.log(reqFoodInfo)
    // DBに登録
    const res = await this.$axios
      .$post('/food', querystring.stringify(reqFoodInfo))
      .catch((error) => {
        console.log(error.message)
      })
    // ユーザー認証が切れていたら格納されている
    if (res.error) {
      return res
    }
    // 食材データが返ってくればstateに格納
    if (res.result) {
      commit('addFood', res.result)
    }
    return res
  },
  // 食材を更新
  async updateFood({ ctx }, food) {
    console.log(food)
    // 成功で更新された食材が格納される
    const res = await this.$axios
      .$put(`/food/${food.id}`, querystring.stringify(food))
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
    return res
  },
  // 食材の削除
  async deleteFood({ ctx }, foodId) {
    console.log(foodId)
    // 成功で削除された食材が格納される
    const res = await this.$axios.$delete(`/food/${foodId}`).catch((error) => {
      console.log(error.message)
    })
    console.log(res)
    return res
  }
}
