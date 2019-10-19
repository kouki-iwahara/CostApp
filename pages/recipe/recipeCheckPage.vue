<template>
  <div class="wrapper">
    <my-page-header />
    <recipe-display />
  </div>
</template>

<script>
import myPageHeader from '~/components/myPageHeader.vue'
import RecipeDisplay from '~/components/RecipeDisplay.vue'

export default {
  components: {
    myPageHeader,
    RecipeDisplay
  }
}
</script>

<style></style>
