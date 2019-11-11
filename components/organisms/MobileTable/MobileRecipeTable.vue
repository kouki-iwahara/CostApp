<template>
  <table class="table mb-0 table-hover">
    <thead class="thead-dark">
      <tr>
        <th scope="col">レシピ名</th>
        <th class="text-right" scope="col">原価(円)</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="recipe in recipes"
        :key="recipe.id"
        @click="toRecipePage(recipes.indexOf(recipe))"
      >
        <td>{{ recipe.name }}</td>
        <td class="text-right">{{ recipe.cost }}</td>
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

<style></style>
