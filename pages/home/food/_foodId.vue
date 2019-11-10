<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <food-view-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import FoodViewDisplay from '~/components/pages/home/food/FoodViewDisplay'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    FoodViewDisplay,
    Footer
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
