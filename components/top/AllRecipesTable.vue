<template>
  <div>
    <div class="title">
      <strong>レシピ一覧</strong>
    </div>
    <div class="card">
      <card-header>
        <ul slot="navbar" class="navbar-nav nav-tabs">
          <li class="nav-item">
            <nuxt-link to="/recipeList" class="nav-link active">
              レシピ一覧
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link">
              絞り込み検索
            </nuxt-link>
          </li>
        </ul>
        <span slot="card-body">
          <strong>{{ allUsersRecipes.length }}</strong>
          <span>のレシピを公開中</span>
        </span>
      </card-header>
      <table class="table mb-0 table-hover">
        <thead>
          <tr>
            <th scope="col">レシピ名</th>
            <th scope="col">原価(円)</th>
            <th scope="col">作成日</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="recipe in allUsersRecipes"
            :key="recipe.id"
            @click="toAllRecipesPage(allUsersRecipes.indexOf(recipe))"
          >
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.cost }}</td>
            <td>{{ recipe.createdAt.substring(0, 10) }}</td>
            <td>{{ recipe.updatedAt.substring(0, 10) }}</td>
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
    // レシピが登録されていたらテーブルに表示する
    allUsersRecipes() {
      const recipes = this.$store.getters['recipe/allUsersRecipes']
      return recipes
    }
  },
  methods: {
    // レシピ詳細画面へ遷移
    toAllRecipesPage(index) {
      const recipe = this.$store.getters['recipe/allUsersRecipes'][index]
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
.title {
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
