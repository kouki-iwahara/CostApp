<template>
  <div>
    <client-only>
      <Header />
      <!-- <div class="search-bar">
        <search-bar />
      </div> -->
      <div class="wrapper">
        <food-list />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
// import searchBar from '~/components/common/searchBar.vue'
import FoodList from '~/components/recipe/FoodList.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    // searchBar,
    FoodList,
    Footer
  }
  // データ取得時にユーザー認証がなかったらsigninへ遷移
  // async fetch({ store, redirect }) {
  //   // 食材データ
  //   const resFood = await store.dispatch('food/getFoodData').catch((error) => {
  //     console.log(error)
  //   })
  //   console.log(resFood)
  //   if (resFood.error) {
  //     redirect('/signin')
  //   }
  // }
}
</script>

<style scoped>
.search-bar {
  position: fixed;
  top: 100px;
}
</style>
