<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <recipe-register-form />
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import RecipeRegisterForm from '~/components/RecipeRegisterForm.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    RecipeRegisterForm,
    Footer
  },
  // データ取得時にユーザー認証がなかったらsigninへ遷移
  async fetch({ store, redirect }) {
    const res = await store.dispatch('food/getFoodData').catch((error) => {
      console.log(error)
    })
    console.log(res)
    if (res.error) {
      redirect('/signin')
    }
  }
}
</script>

<style></style>
