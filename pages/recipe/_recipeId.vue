<template>
  <div class="wrapper">
    <my-page-header />
    <recipe-update-form />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import RecipeUpdateForm from '~/components/RecipeUpdateForm.vue'

export default {
  components: {
    MyPageHeader,
    RecipeUpdateForm
  }
}
</script>

<style></style>
