<template>
  <div class="wrapper">
    <Header />
    <recipe-display />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import RecipeDisplay from '~/components/RecipeDisplay.vue'

export default {
  components: {
    Header,
    RecipeDisplay
  },
  async asyncData({ store }) {
    await store.dispatch('recipe/getRecipeData').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
