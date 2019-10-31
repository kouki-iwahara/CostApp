<template>
  <div>
    <!-- 検索バー -->
    <div class="search-bar col-sm-6">
      <search-bar v-model="searchText" placeholder="レシピ名を検索" />
    </div>

    <!-- テーブル上部のメッセージ -->
    <div class="table-message">
      <div>
        <!-- レシピがあれば表示 -->
        <div v-show="recipes.length">
          <p>
            <strong>{{ recipes.length }}</strong>
            個のレシピを公開中
          </p>
        </div>
        <!-- レシピが無ければ表示 -->
        <div v-show="!recipes.length">
          <p>登録がありません</p>
        </div>
      </div>
      <!-- 新規登録ボタン -->
      <div>
        <button class="btn btn-orange btn-sm">
          <nuxt-link to="/home/recipe/register" class="nav-link">
            新規作成
          </nuxt-link>
        </button>
      </div>
    </div>

    <!-- pc表示のテーブル -->
    <table class="window-table table mb-0 table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">レシピ名</th>
          <th scope="col">原価(円)</th>
          <th scope="col">作成日</th>
          <th scope="col">最終更新</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="recipe in recipes"
          :key="recipe.id"
          @click="toAllRecipesPage(recipes.indexOf(recipe))"
        >
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.cost }}</td>
          <td>{{ recipe.createdAt.substring(0, 10) }}</td>
          <td>{{ recipe.updatedAt.substring(0, 10) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- スマホ表示のテーブル -->
    <table class="mobile-table table mb-0 table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">レシピ名</th>
          <th class="cost" scope="col">原価(円)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="recipe in recipes"
          :key="recipe.id"
          @click="toAllRecipesPage(recipes.indexOf(recipe))"
        >
          <td>{{ recipe.name }}</td>
          <td class="cost">{{ recipe.cost }}</td>
        </tr>
      </tbody>
    </table>
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
      searchText: ''
    }
  },
  computed: {
    // 検索バーとレンダリングさせてテーブルにレシピを表示する
    recipes() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/allUsersRecipes']
      if (!this.searchText) {
        return recipes
      }
      // 検索のテキストを含む名前を表示する
      recipes.forEach((recipe) => {
        if (recipe.name.includes(this.searchText)) {
          filterRecipes.push(recipe)
        }
      })
      return filterRecipes
    }
  },
  methods: {
    // レシピ詳細画面へ遷移
    toAllRecipesPage(index) {
      const recipe = this.recipes[index]
      console.log(recipe)
      // 遷移時にrecipeIdを渡す
      this.$router.push({
        path: `/recipe/${recipe.id}`
      })
    }
  }
}
</script>

<style scoped>
/* 検索バー */
.search-bar {
  margin: 0 auto 30px;
}
/* /検索バー */

/* テーブル */
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
  border-color: #9d9d9d;
}

/* min-width: 576pxからスマホ用のテーブルに切り替わる */
.window-table {
  display: none;
}

.cost {
  text-align: right;
}
/* /テーブル */
@media screen and (min-width: 576px) {
  .window-table {
    display: table;
  }
  .mobile-table {
    display: none;
  }
}
</style>
