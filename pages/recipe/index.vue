<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-list-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import RecipeListDisplay from '~/components/pages/top/recipe/RecipeListDisplay.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeListDisplay,
    Footer
  },
  async fetch({ store }) {
    await store.dispatch('recipe/getAllUsersRecipes').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped></style>
