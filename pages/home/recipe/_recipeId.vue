<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-view-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import Header from '~/components/top/Header.vue'
import RecipeViewDisplay from '~/components/pages/home/recipe/RecipeViewDisplay'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeViewDisplay,
    Footer
  },
  async fetch({ store, redirect }) {
    // レシピデータの取得
    const res = await store.dispatch('recipe/getRecipeData').catch((error) => {
      console.log(error)
    })
    // ユーザー認証がなかったらsigninへ遷移
    if (res.error) {
      redirect('/signin')
    }
  }
}
</script>

<style></style>
