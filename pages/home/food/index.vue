<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <my-food-list-display />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import MyFoodListDisplay from '~/components/organisms/MyPage/MyFoodListDisplay.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    MyFoodListDisplay,
    Footer
  },
  async fetch({ store, redirect }) {
    // 食材データの取得
    const resFood = await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
    // ページ遷移時にユーザー認証がなかったらsigninへ遷移
    if (resFood.error) {
      redirect('/signin')
    }
  }
}
</script>

<style></style>
