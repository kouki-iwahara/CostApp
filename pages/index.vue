<template>
  <div class="wrapper">
    <Header />
    <recipe-cards />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import RecipeCards from '~/components/top/RecipeCards.vue'

export default {
  components: {
    Header,
    RecipeCards
  },
  async asyncData({ store }) {
    await store.dispatch('recipe/getAllUsersRecipes').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
