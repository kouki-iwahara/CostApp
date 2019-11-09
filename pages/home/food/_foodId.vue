<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <view-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import ViewDisplay from '~/components/pages/home/food/ViewDisplay'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    ViewDisplay,
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
