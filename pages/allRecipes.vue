<template>
  <div class="wrapper">
    <Header />
    <all-users-recipe-display />
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import AllUsersRecipeDisplay from '~/components/AllUsersRecipeDisplay.vue'

export default {
  components: {
    Header,
    AllUsersRecipeDisplay
  },
  async asyncData({ store }) {
    await store.dispatch('recipe/getAllUsersRecipes').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
