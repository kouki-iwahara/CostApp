<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <my-recipe-list-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import MyRecipeListDisplay from '~/components/organisms/MyPage/MyRecipeListDisplay'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    MyRecipeListDisplay,
    Footer
  },
  async fetch({ store, redirect }) {
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
