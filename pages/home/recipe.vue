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
  },
  async asyncData({ store, redirect }) {
    const res = await store.dispatch('recipe/getRecipeData').catch((error) => {
      console.log(error)
    })
    // ユーザー認証がなかったらsigninへ遷移
    if (res.error) {
      alert(res.error)
      redirect('/signin')
    }
    await store.dispatch('user/authenticator').catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style></style>
