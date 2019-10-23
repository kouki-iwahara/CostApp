<template>
  <div class="wrapper">
    <!-- 読み込む順番でサイドバーが動かないことがある -->
    <client-only>
      <Header />
      <my-page-display>
        <my-food-table slot="my-table" />
      </my-page-display>
    </client-only>
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import MyPageDisplay from '~/components/home/MyPageDisplay.vue'
import MyFoodTable from '~/components/home/MyFoodTable.vue'

export default {
  components: {
    Header,
    MyPageDisplay,
    MyFoodTable
  },
  async asyncData({ store, redirect }) {
    const res = await store.dispatch('food/getFoodData').catch((error) => {
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
