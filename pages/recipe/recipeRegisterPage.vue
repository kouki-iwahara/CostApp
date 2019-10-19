<template>
  <div class="wrapper">
    <my-page-header />
    <recipe-register-form />
  </div>
</template>

<script>
import myPageHeader from '~/components/myPageHeader.vue'
import RecipeRegisterForm from '~/components/RecipeRegisterForm.vue'

export default {
  components: {
    myPageHeader,
    RecipeRegisterForm
  }
}
</script>

<style></style>
