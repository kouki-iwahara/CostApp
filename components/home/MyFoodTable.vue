<template>
  <div>
    <!-- <div class="user-name">
      <strong>{{ $store.state.user.user.email }}さんのマイページ</strong>
    </div> -->

    <navbar
      :is-food-active="{ active: isFoodActive }"
      :is-recipe-inactive="{
        inactive: isRecipeInactive
      }"
    />
    <!-- 検索バー -->
    <div class="form  col-sm-6">
      <search-bar v-model="searchText" placeholder="食材を検索" />
    </div>

    <!-- テーブル -->
    <div>
      <!-- テーブル上部のメッセージ -->
      <div class="table-message">
        <div>
          <!-- 食材があれば表示 -->
          <div v-show="filterFoods.length">
            <p>
              <strong>{{ filterFoods.length }}</strong>
              個のレシピを公開中
            </p>
          </div>
          <!-- 食材が無ければ表示 -->
          <div v-show="!filterFoods.length">
            <p>登録がありません</p>
          </div>
        </div>
        <!-- 新規作成ボタン -->
        <div>
          <button class="btn btn-orange btn-sm">
            <nuxt-link to="/home/food/register" class="nav-link">
              新規作成
            </nuxt-link>
          </button>
        </div>
      </div>
      <!-- テーブル上部のメッセージ終わり -->

      <!-- pc表示用テーブル -->
      <table class="window-table table mb-0 table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">食材名</th>
            <th scope="col">原価<small>(円/単位)</small></th>
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

      <!-- スマホ表示テーブル -->
      <table class="mobile-table table mb-0 table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">食材名</th>
            <th class="cost" scope="col">原価<small>(円/単位)</small></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="food in filterFoods"
            :key="food.id"
            @click="toFoodIdPage(filterFoods.indexOf(food))"
          >
            <td>{{ food.name }}</td>
            <td class="cost">{{ food.cost }}{{ `/${food.unit}` }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/common/Navbar.vue'
import searchBar from '~/components/common/searchBar.vue'

export default {
  components: {
    Navbar,
    searchBar
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
    // 一致するfoodIdに画面遷移
    toFoodIdPage(index) {
      const food = this.filterFoods[index]
      console.log(food)
      this.$router.push({ path: `/home/food/${food.id}` })
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

.table-message {
  display: flex;
  justify-content: space-between;
}

.table-message p {
  margin-bottom: 0;
}

.btn-orange {
  margin-bottom: 5px;
  color: #fff;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
}
.btn-orange .nav-link {
  padding: 0;
  color: #fff;
}
.table td {
  cursor: pointer;
}
.window-table {
  display: none;
}
.cost {
  text-align: right;
}
@media screen and (min-width: 576px) {
  .window-table {
    display: table;
  }
  .mobile-table {
    display: none;
  }
}
</style>
