<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import Header from '~/components/top/Header.vue'
import RecipeDisplay from '~/components/RecipeDisplay.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeDisplay,
    Footer
  },
  async asyncData({ store, redirect }) {
    // レシピデータの取得
    const res = await store.dispatch('recipe/getRecipeData').catch((error) => {
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
