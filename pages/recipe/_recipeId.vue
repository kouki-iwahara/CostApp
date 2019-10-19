<template>
  <div class="wrapper">
    <Header />
    <recipe-update-form />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import RecipeUpdateForm from '~/components/RecipeUpdateForm.vue'

export default {
  components: {
    Header,
    RecipeUpdateForm
  }
}
</script>

<style></style>
