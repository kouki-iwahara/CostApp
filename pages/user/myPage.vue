<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <food-display />
    <my-page-header />
  </div>
</template>

<script>
import myPageHeader from '~/components/myPageHeader.vue'
import FoodDisplay from '~/components/FoodDisplay.vue'

export default {
  components: {
    myPageHeader,
    FoodDisplay
  }
}
</script>

<style></style>
