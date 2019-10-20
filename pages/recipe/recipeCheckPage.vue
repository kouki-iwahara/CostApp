<template>
  <div class="wrapper">
    <my-page-header />
    <recipe-display />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import RecipeDisplay from '~/components/RecipeDisplay.vue'

export default {
  components: {
    MyPageHeader,
    RecipeDisplay
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
