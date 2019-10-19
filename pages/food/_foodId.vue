<template>
  <div class="wrapper">
    <my-page-header />
    <food-update-form />
  </div>
</template>

<script>
import myPageHeader from '~/components/myPageHeader.vue'
import FoodUpdateForm from '~/components/FoodUpdateForm.vue'

export default {
  components: {
    myPageHeader,
    FoodUpdateForm
  },
  async asyncData({ store }) {
    await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
