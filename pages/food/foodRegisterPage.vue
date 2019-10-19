<template>
  <div class="wrapper">
    <my-page-header />
    <food-register-form />
  </div>
</template>

<script>
import myPageHeader from '~/components/myPageHeader.vue'
import FoodRegisterForm from '~/components/FoodRegisterForm.vue'

export default {
  components: {
    myPageHeader,
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
