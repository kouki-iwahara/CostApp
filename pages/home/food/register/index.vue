<template>
  <div class="wrapper">
    <Header />
    <food-register-form />
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import FoodRegisterForm from '~/components/FoodRegisterForm.vue'

export default {
  components: {
    Header,
    FoodRegisterForm
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
