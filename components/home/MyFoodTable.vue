<template>
  <div>
    <div class="user-name">
      <strong>{{ $store.state.user.user.email }}さんのマイページ</strong>
    </div>

    <navbar
      :is-food-active="{ active: isFoodActive }"
      :is-recipe-inactive="{
        inactive: isRecipeInactive
      }"
    />

    <div class="form  col-sm-6">
      <input
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="食材を検索"
      />
    </div>
    <div class="content">
      <div class="content_btn">
        <button class="btn btn-orange float-right">New</button>
        <strong
          >{{ $store.getters['food/foods'].length }}個の食材を登録中</strong
        >
      </div>
      <table class="table mb-0 table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">食材名</th>
            <th scope="col">原価(円/単位)</th>
            <th scope="col">作成日</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="food in filterFoods"
            :key="food.id"
            @click="toFoodIdPage(filterFoods.indexOf(food))"
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
import Navbar from '~/components/common/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      isFoodActive: true,
      isRecipeInactive: true,
      searchText: ''
    }
  },
  computed: {
    // 食材の検索をリアルタイムで表示
    filterFoods() {
      const filterFoods = []
      const foods = this.$store.getters['food/foods']
      // 検索していなければ全ての食材を表示
      if (!this.searchText) {
        return foods
      }
      // 検索のテキストを含む名前を表示する
      foods.forEach((food) => {
        if (food.name.includes(this.searchText)) {
          filterFoods.push(food)
        }
      })
      return filterFoods
    }
  },
  methods: {
    // 画面遷移時にfoodIdを渡す
    toFoodIdPage(index) {
      const food = this.filterFoods[index]
      console.log(food)
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
.form {
  margin: 20px auto;
}
.form .form-control {
  border-radius: 0.25em;
  margin: 0 auto;
}

.btn-orange {
  color: #fff;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  height: 38px;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
}
.table {
  margin-top: 20px;
}
.table td {
  cursor: pointer;
}
</style>
