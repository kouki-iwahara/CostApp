<template>
  <div class="wrapper">
    <Header />
    <recipe-update-form />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import RecipeUpdateForm from '~/components/RecipeUpdateForm.vue'

export default {
  components: {
    Header,
    RecipeUpdateForm
  },
  async asyncData({ store }) {
    await store.dispatch('recipe/getRecipeData').catch((error) => {
      console.log(error)
    })
    await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
