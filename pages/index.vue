<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <food-display />
    <Header />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import FoodDisplay from '~/components/FoodDisplay.vue'

export default {
  components: {
    Header,
    FoodDisplay
  },
  // 全ての食材データを取得
  async asyncData({ app, store }) {
    await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
