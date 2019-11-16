<template>
  <table class="table mb-0 table-hover">
    <thead class="thead-dark">
      <tr>
        <th scope="col">レシピ名</th>
        <th scope="col">原価</th>
        <slot name="th" />
        <th scope="col">作成日</th>
        <th scope="col">最終更新</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="recipe in recipes"
        :key="recipe.id"
        @click="toRecipePage(recipes.indexOf(recipe))"
      >
        <td>{{ recipe.name }}</td>
        <td>{{ recipe.cost }}円</td>
        <slot name="td" />
        <td>{{ recipe.createdAt.substring(0, 10) }}</td>
        <td>{{ recipe.updatedAt.substring(0, 10) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
      default: null
    }
  },
  methods: {
    // レシピ詳細画面へ遷移
    toRecipePage(index) {
      this.$emit('toRecipePage', index)
    }
  }
}
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
