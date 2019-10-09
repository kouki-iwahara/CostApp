<template>
  <div class="wrapper">
    <Header />
    <recipe-register-form />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import RecipeRegisterForm from '~/components/RecipeRegisterForm.vue'

export default {
  components: {
    Header,
    RecipeRegisterForm
  },
  async asyncData({ store }) {
    await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
