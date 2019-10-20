<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <food-display />
    <my-page-header />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import FoodDisplay from '~/components/FoodDisplay.vue'

export default {
  components: {
    MyPageHeader,
    FoodDisplay
  },
  async asyncData({ store, redirect }) {
    // 食材データの取得
    const res = await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
    // ユーザー認証がなかったらsigninへ遷移
    if (res.error) {
      alert(res.error)
      redirect('/signin')
    }
  }
}
</script>

<style></style>
