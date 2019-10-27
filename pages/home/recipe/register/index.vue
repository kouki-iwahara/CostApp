<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-register-form />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import RecipeRegisterForm from '~/components/RecipeRegisterForm.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeRegisterForm,
    Footer
  }
}
</script>

<style></style>
