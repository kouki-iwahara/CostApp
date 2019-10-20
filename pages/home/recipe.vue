<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <my-page-header />
    <my-page-display>
      <my-recipe-table slot="my-table" />
    </my-page-display>
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import MyPageDisplay from '~/components/home/MyPageDisplay.vue'
import MyRecipeTable from '~/components/home/MyRecipeTable.vue'

export default {
  components: {
    MyPageHeader,
    MyPageDisplay,
    MyRecipeTable
  }
}
</script>

<style></style>
