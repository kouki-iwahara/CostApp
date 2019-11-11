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

<style></style>
