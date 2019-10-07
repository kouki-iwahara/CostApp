<template>
  <div class="wrapper">
    <Header />
    <food-register-form />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import FoodRegisterForm from '~/components/FoodRegisterForm.vue'

export default {
  components: {
    Header,
    FoodRegisterForm
  }
}
</script>

<style></style>
