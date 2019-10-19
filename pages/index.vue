<template>
  <div class="wrapper">
    <Header />
    <all-users-recipe-display />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import AllUsersRecipeDisplay from '~/components/AllUsersRecipeDisplay.vue'

export default {
  components: {
    Header,
    AllUsersRecipeDisplay
  }
}
</script>

<style></style>
