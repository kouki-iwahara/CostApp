<template>
  <div class="wrapper">
    <Header />
    <recipe-display />
    <side-bar>
      全てのメニュー
    </side-bar>
  </div>
</template>

<script>
import SideBar from '~/components/SideBar.vue'
import Header from '~/components/Header.vue'
import RecipeDisplay from '~/components/RecipeDisplay.vue'

export default {
  components: {
    SideBar,
    Header,
    RecipeDisplay
  }
}
</script>

<style></style>
