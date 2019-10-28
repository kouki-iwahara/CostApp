<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <top-recipe-list-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import TopRecipeListDisplay from '~/components/top/TopRecipeListDisplay.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    TopRecipeListDisplay,
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
