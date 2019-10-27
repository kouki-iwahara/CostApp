<template>
  <div>
    <client-only>
      <Header />
      <div class="wrapper">
        <my-page-display>
          <my-recipe-table slot="my-table" />
        </my-page-display>
      </div>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import MyPageDisplay from '~/components/home/MyPageDisplay.vue'
import MyRecipeTable from '~/components/home/MyRecipeTable.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    MyPageDisplay,
    MyRecipeTable,
    Footer
  },
  async fetch({ store, redirect }) {
    const res = await store.dispatch('recipe/getRecipeData').catch((error) => {
      console.log(error)
    })
    // ユーザー認証がなかったらsigninへ遷移
    if (res.error) {
      alert(res.error)
      redirect('/signin')
    }
  }
}
</script>

<style></style>
