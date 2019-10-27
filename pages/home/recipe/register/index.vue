<template>
  <div class="wrapper">
    <my-page-header />
    <recipe-register-form />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import RecipeRegisterForm from '~/components/RecipeRegisterForm.vue'

export default {
  components: {
    MyPageHeader,
    RecipeRegisterForm
  }
}
</script>

<style></style>
