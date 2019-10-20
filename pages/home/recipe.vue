<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <my-page-header />
    <my-page-display />
  </div>
</template>

<script>
import myPageHeader from '~/components/myPageHeader.vue'
import MyPageDisplay from '~/components/MyPageDisplay.vue'

export default {
  components: {
    myPageHeader,
    MyPageDisplay
  }
}
</script>

<style></style>
