<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-register-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import RecipeRegisterDisplay from '~/components/pages/home/recipe/register/RecipeRegisterDisplay'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeRegisterDisplay,
    Footer
  },
  // データ取得時にユーザー認証がなかったらsigninへ遷移
  async fetch({ store, redirect }) {
    // 食材データ
    const resFood = await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
    console.log(resFood)
    if (resFood.error) {
      redirect('/signin')
    }
    // レシピデータ（paramのセットに必要）
    await store.dispatch('recipe/getRecipeData').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
