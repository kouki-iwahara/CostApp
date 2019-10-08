<template>
  <div class="wrapper">
    <Header />
    <food-update-form />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import FoodUpdateForm from '~/components/FoodUpdateForm.vue'

export default {
  components: {
    Header,
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
