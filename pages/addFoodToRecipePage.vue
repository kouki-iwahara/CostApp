<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <my-page-header />
    <food-display>
      <div class="update-btn col-sm-6 ">
        <button type="button" class="btn btn-success btn-block btn-lg">
          選択
        </button>
        <nuxt-link to="/recipeRegisterPage" class="nav-link">
          ボタン押下でここに遷移する
        </nuxt-link>
      </div>
    </food-display>
    <side-bar />
  </div>
</template>

<script>
import MyPageHeader from '~/components/home/MyPageHeader.vue'
import SideBar from '~/components/SideBar.vue'
import FoodDisplay from '~/components/FoodDisplay.vue'

export default {
  components: {
    MyPageHeader,
    FoodDisplay,
    SideBar
  }
}
</script>

<style></style>
