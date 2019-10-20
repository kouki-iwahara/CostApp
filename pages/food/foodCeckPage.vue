<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <food-display />
    <my-page-header />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import FoodDisplay from '~/components/FoodDisplay.vue'

export default {
  components: {
    MyPageHeader,
    FoodDisplay
  }
}
</script>

<style></style>
