<template>
  <div class="wrapper">
    <Header />
    <recipe-list-display />
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import RecipeListDisplay from '~/components/top/RecipeListDisplay.vue'

export default {
  components: {
    Header,
    RecipeListDisplay
  },
  async asyncData({ store }) {
    await store.dispatch('recipe/getAllUsersRecipes').catch((error) => {
      console.log(error)
    })
    await store.dispatch('user/authenticator').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
