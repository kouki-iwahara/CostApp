<template>
  <div>
    <div class="content container-fluid">
      <div class="row">
        <div class="search-bar col-sm-12">
          <p><strong> 追加する食材を選択</strong></p>
          <search-bar v-model="searchText" placeholder="食材名を検索" />
        </div>
        <div class="content_list col-sm-12">
          <ul
            v-for="item in foods"
            v-show="foods.length"
            slot="content-list"
            :key="item.id"
            class="list-group list-group-flush"
          >
            <li
              class="food-list_item list-group-item border-bottom"
              @click="selectFood(foods.indexOf(item))"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div v-show="!foods.length" class="no-result-message">
          <p>登録がありません</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from '~/components/common/searchBar.vue'

export default {
  components: {
    searchBar
  },
  data() {
    return {
      recipeFoods: [],
      searchText: ''
    }
  },
  computed: {
    // 検索バーと結果とレンダリングさせて表示
    foods() {
      const filterFoods = []
      const foods = this.$store.getters['food/foods'].slice()
      if (!this.searchText) {
        return foods
      }
      foods.forEach((food) => {
        if (food.name.includes(this.searchText)) {
          filterFoods.push(food)
        }
      })
      return filterFoods
    }
  },
  created() {
    // this.recipeFoods = this.$route.query.recipeFoods.slice()
    this.recipeFoods = [{ name: 'jijij', age: '23' }].slice()
  },
  methods: {
    selectFood(index) {
      const food = this.foods[index]
      console.log(food)
      // 食材の重複禁止の為、idが重複しているか調べる
      if (this.$route.query.tableFoods) {
        const overlapId = this.$route.query.tableFoods.find((tableFood) => {
          return tableFood.id === food.id
        })
        // idが重複していた場合
        if (overlapId) {
          alert('その食材は使われています')
          return
        }
      }
      // 選択した食材をクエリにセットして画面遷移
      this.$router.push({
        path: '/home/recipe/register',
        query: { recipeFood: food, tableFoods: this.$route.query.tableFoods }
      })
    }
  }
}
</script>

<style scoped>
.search-bar {
  text-align: center;
  padding: 8px 15px;
  position: fixed;
  top: 60px;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: #e9ecef;
}

.search-bar p {
  margin-bottom: 8px;
}
.no-result-message {
  margin: 0 auto;
}

.content_list {
  padding-top: 101px;
}
</style>
