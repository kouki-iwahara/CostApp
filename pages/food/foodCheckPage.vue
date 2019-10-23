<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <client-only>
      <Header />
      <food-display />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import FoodDisplay from '~/components/FoodDisplay.vue'

export default {
  components: {
    Header,
    FoodDisplay
  },
  async fetch({ store, redirect }) {
    // 食材データの取得
    const resFood = await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
    // ページ遷移時にユーザー認証がなかったらsigninへ遷移
    if (resFood.error) {
      redirect('/signin')
    }
    // レシピデータの取得
    await store.dispatch('recipe/getRecipeData').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
