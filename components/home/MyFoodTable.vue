<template>
  <div>
    <div class="user-name">
      <strong>xxxxxxxxさんのマイページ</strong>
    </div>
    <div class="card">
      <card-header :is-food-active="isFoodActive" />
      <table class="table mb-0 table-hover">
        <thead class="">
          <tr>
            <th scope="col">食材名</th>
            <th scope="col">原価</th>
            <th scope="col">作成日</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="food in foods" :key="food.id">
            <td>{{ food.name }}</td>
            <td>{{ food.cost }}</td>
            <td>{{ food.createdAt.substring(0, 10) }}</td>
            <td>{{ food.updatedAt.substring(0, 10) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CardHeader from '~/components/home/CardHeader.vue'

export default {
  components: {
    CardHeader
  },
  data() {
    return {
      isFoodActive: true
    }
  },
  computed: {
    foods() {
      return this.$store.getters['food/foods']
    }
  },
  async created() {
    const res = await this.$store
      .dispatch('food/getFoodData')
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
    // ユーザー認証が切れていたらsigninに遷移
    if (res.error) {
      alert(res.error)
      this.$router.push({ path: '/signin' })
    }
  }
}
</script>

<style>
.user-name {
  font-size: 1.25em;
  margin: 20px 0;
}
.breadcrumb li .nav-link {
  display: inline;
  padding: 0;
}
.table th {
  border-top: none;
}
.table td {
  cursor: pointer;
}
.card {
  border: none;
}
.card-header {
  border: none;
  padding: 0;
}
.navbar {
  /* border: none; */
  padding: 0;
}
</style>
