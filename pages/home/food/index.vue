<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <!-- 読み込む順番でサイドバーが動かないことがある -->
        <!-- <my-page-display>
          <my-food-table slot="my-table" />
        </my-page-display> -->
        <!-- <my-food-list-display /> -->
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
// import MyFoodListDisplay from '~/components/organisms/MyPage/MyFoodListDisplay.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    // MyFoodListDisplay,
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
  // async created() {
  //   await this.$store.dispatch('food/getFoodData').catch((error) => {
  //     console.log(error)
  //   })
  //   // ユーザー認証がなかったらsigninへ遷移
  // }
}
</script>

<style></style>
