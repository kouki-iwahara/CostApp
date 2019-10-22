<template>
  <div>
    <div class="user-name">
      <strong>{{ this.$store.state.user.user.email }}さんのマイページ</strong>
    </div>
    <div class="card">
      <card-header>
        <ul slot="navbar" class="navbar-nav nav-tabs">
          <li class="nav-item">
            <nuxt-link to="/home/food" class="nav-link">
              食材一覧
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/home/recipe" class="nav-link active">
              レシピ一覧
            </nuxt-link>
          </li>
        </ul>
      </card-header>
      <table class="table mb-0 table-hover">
        <thead class="">
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
            v-for="recipe in recipes"
            :key="recipe.id"
            @click="
              toRecipeIdPage($store.getters['recipe/recipes'].indexOf(recipe))
            "
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
import CardHeader from '~/components/CardHeader.vue'

export default {
  components: {
    CardHeader
  },
  data() {
    return {
      isRecipeActive: true
    }
  },
  computed: {
    recipes() {
      return this.$store.getters['recipe/recipes']
    }
  },
  methods: {
    // 画面遷移時にfoodIdを渡す
    toRecipeIdPage(index) {
      const recipe = this.$store.getters['recipe/recipes'][index]
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
