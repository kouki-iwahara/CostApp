<template>
  <div class="wrapper">
    <client-only>
      <Header />
      <food-update-form />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import FoodUpdateForm from '~/components/FoodUpdateForm.vue'

export default {
  components: {
    Header,
    FoodUpdateForm
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
  }
}
</script>

<style></style>
