<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-cards />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import RecipeCards from '~/components/top/RecipeCards.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeCards,
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
.wrapper {
  height: 100%;
}
</style>
