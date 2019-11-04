<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <food-register-form />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import FoodRegisterForm from '~/components/FoodRegisterForm.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    FoodRegisterForm,
    Footer
  }
  // async fetch({ store, redirect }) {
  //   // 食材データの取得
  //   const resFood = await store.dispatch('food/getFoodData').catch((error) => {
  //     console.log(error)
  //   })
  //   // ページ遷移時にユーザー認証がなかったらsigninへ遷移
  //   if (resFood.error) {
  //     redirect('/signin')
  //   }
  // }
}
</script>

<style></style>
