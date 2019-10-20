<template>
  <div class="wrapper">
    <my-page-header />
    <recipe-display />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import RecipeDisplay from '~/components/RecipeDisplay.vue'

export default {
  components: {
    MyPageHeader,
    RecipeDisplay
  }
}
</script>

<style></style>
