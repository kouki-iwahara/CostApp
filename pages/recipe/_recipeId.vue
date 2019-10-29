<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <all-users-recipe-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import AllUsersRecipeDisplay from '~/components/AllUsersRecipeDisplay.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    AllUsersRecipeDisplay,
    Footer
  },
  async asyncData({ store }) {
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
