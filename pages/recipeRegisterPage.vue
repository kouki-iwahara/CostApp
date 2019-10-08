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
  }
}
</script>

<style></style>
