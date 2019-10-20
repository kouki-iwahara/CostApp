<template>
  <div>
    <div class="user-name">
      <strong>xxxxxxxxさんのマイページ</strong>
    </div>
    <div class="card">
      <card-header :is-recipe-active="isRecipeActive" />
      <table class="table mb-0 table-hover">
        <thead class="">
          <tr>
            <th scope="col">レシピ名</th>
            <th scope="col">原価</th>
            <th scope="col">原価率</th>
            <th scope="col">作成日</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe.id">
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
import CardHeader from '~/components/home/CardHeader.vue'

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
