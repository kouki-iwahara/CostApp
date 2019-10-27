<template>
  <div>
    <div class="user-name">
      <strong>{{ $store.state.user.user.email }}さんのマイページ</strong>
    </div>
    <navbar
      :is-food-inactive="{ inactive: isFoodInactive }"
      :is-recipe-active="{
        active: isRecipeActive
      }"
    />
    <div class="form  col-sm-6">
      <input
        v-model="searchText"
        type="text"
        class="form-control"
        placeholder="レシピを検索"
      />
    </div>
    <div>
      <div>
        <button class="btn btn-orange btn-sm">
          <nuxt-link to="/home/recipe/register" class="nav-link">
            新規作成
          </nuxt-link>
        </button>
      </div>
      <table class="table mb-0 table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">レシピ名</th>
            <th scope="col">原価(円)</th>
            <th scope="col">原価率(％)</th>
            <th scope="col">作成日</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="recipe in filterRecipes"
            :key="recipe.id"
            @click="toRecipeIdPage(filterRecipes.indexOf(recipe))"
          >
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.cost }}</td>
            <td>{{ recipe.costRate }}</td>
            <td>{{ recipe.createdAt.substring(0, 10) }}</td>
            <td>{{ recipe.updatedAt.substring(0, 10) }}</td>
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
      isFoodInactive: true,
      isRecipeActive: true,
      searchText: ''
    }
  },
  computed: {
    recipes() {
      return this.$store.getters['recipe/recipes']
    },
    // 食材の検索をリアルタイムで表示
    filterRecipes() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/recipes']
      // 検索していなければ全ての食材を表示
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
    // 画面遷移時にfoodIdを渡す
    toRecipeIdPage(index) {
      const recipe = this.filterRecipes[index]
      console.log(recipe)
      this.$router.push({
        path: `/recipe/recipeCheckPage?recipeId=${recipe.id}`
      })
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
/* 新規作成ボタン */
.btn-orange {
  display: block;
  margin: 0 0 5px auto;
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
</style>
