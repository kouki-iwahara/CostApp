<template>
  <div class="wrapper">
    <my-page-header />
    <food-register-form />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import FoodRegisterForm from '~/components/FoodRegisterForm.vue'

export default {
  components: {
    MyPageHeader,
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
