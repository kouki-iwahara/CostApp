<template>
  <div class="wrapper">
    <my-page-header />
    <recipe-update-form />
  </div>
</template>

<script>
import myPageHeader from '~/components/myPageHeader.vue'
import RecipeUpdateForm from '~/components/RecipeUpdateForm.vue'

export default {
  components: {
    myPageHeader,
    RecipeUpdateForm
  }
}
</script>

<style></style>
