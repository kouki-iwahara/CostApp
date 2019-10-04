<template>
  <div class="wrapper">
    <Header />
    <recipe-register-form />
    <side-bar>
      追加する食材
    </side-bar>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import SideBar from '~/components/SideBar.vue'
import RecipeRegisterForm from '~/components/RecipeRegisterForm.vue'

export default {
  components: {
    SideBar,
    Header,
    RecipeRegisterForm
  }
}
</script>

<style></style>
