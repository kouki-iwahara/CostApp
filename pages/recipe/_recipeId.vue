<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-view-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import RecipeViewDisplay from '~/components/pages/top/recipe/RecipeViewDisplay'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeViewDisplay,
    Footer
  },
  async fetch({ store }) {
    await store.dispatch('recipe/getAllUsersRecipes').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
/* .wrapper {
  padding-top: 0;
} */
</style>
