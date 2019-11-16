<template>
  <div class="content">
    <!-- ユーザーネームの表示 -->
    <div class="user-name col-sm-12">
      <user-name />
    </div>

    <!-- ナビゲーション -->
    <div class="col-sm-12">
      <nav-component
        :is-food-active="{ active: isFoodActive }"
        :is-recipe-inactive="{
          inactive: isRecipeInactive
        }"
      />
    </div>

    <!-- 検索バー -->
    <div class="search-bar col-sm-6">
      <text-input v-model="searchText" placeholder="食材を検索" />
    </div>

    <!-- テーブル上部のメッセージ -->
    <div class="col-sm-12 d-flex justify-content-between">
      <div>
        <strong-text>
          {{ foods.length }}
        </strong-text>
        個の食材を登録しています
      </div>
      <!-- 新規作成ボタン -->
      <new-create-btn link="/home/food/register" />
    </div>

    <!-- テーブル -->
    <div class="col-sm-12">
      <food-table
        class="window-table"
        :foods="foods"
        @toFoodPage="toFoodPage"
      />
      <mobile-food-table
        class="mobile-table"
        :foods="foods"
        @toFoodPage="toFoodPage"
      />
    </div>
  </div>
</template>

<script>
import UserName from '~/components/molecules/Text/UserName'
import NavComponent from '~/components/molecules/Nav/NavComponent'
import TextInput from '~/components/atoms/TextBox/TextInput'
import StrongText from '~/components/atoms/Text/StrongText'
import NewCreateBtn from '~/components/molecules/Btn/NewCreateBtn'
import FoodTable from '~/components/organisms/Table/FoodTable'
import MobileFoodTable from '~/components/organisms/MobileTable/MobileFoodTable'

export default {
  components: {
    UserName,
    TextInput,
    NavComponent,
    StrongText,
    NewCreateBtn,
    FoodTable,
    MobileFoodTable
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
    foods() {
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
    toFoodPage(index) {
      const food = this.foods[index]
      console.log(food)
      this.$router.push({ path: `/home/food/${food.id}` })
    }
  }
}
</script>

<style scoped>
.user-name {
  margin: 20px 0;
}

.search-bar {
  margin: 20px auto;
}
</style>
