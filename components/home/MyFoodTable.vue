<template>
  <div>
    <div class="user-name">
      <strong>xxxxxxxxさんのマイページ</strong>
    </div>
    <div class="card">
      <card-header>
        <ul slot="navbar" class="navbar-nav nav-tabs">
          <li class="nav-item">
            <nuxt-link to="/home/food" class="nav-link active">
              食材一覧
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/home/recipe" class="nav-link">
              レシピ一覧
            </nuxt-link>
          </li>
        </ul>
      </card-header>
      <table class="table mb-0 table-hover">
        <thead class="">
          <tr>
            <th scope="col">食材名</th>
            <th scope="col">原価(円)</th>
            <th scope="col">作成日</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="food in foods"
            :key="food.id"
            @click="toFoodIdPage($store.getters['food/foods'].indexOf(food))"
          >
            <td>{{ food.name }}</td>
            <td>{{ food.cost }}{{ `/${food.unit}` }}</td>
            <td>{{ food.createdAt.substring(0, 10) }}</td>
            <td>{{ food.updatedAt.substring(0, 10) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CardHeader from '~/components/CardHeader.vue'

export default {
  components: {
    CardHeader
  },
  computed: {
    foods() {
      return this.$store.getters['food/foods']
    }
  },
  methods: {
    // 画面遷移時にfoodIdを渡す
    toFoodIdPage(index) {
      const food = this.$store.getters['food/foods'][index]
      this.$router.push({ path: `/food/foodCheckPage?foodId=${food.id}` })
    }
  }
}
</script>

<style scoped>
.user-name {
  font-size: 1.25em;
  margin: 20px 0;
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
</style>
