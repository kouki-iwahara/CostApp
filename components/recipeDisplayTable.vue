<template>
  <table class="table">
    <thead class="thead-light">
      <tr>
        <th scope="col">食材名</th>
        <th scope="col">使用量</th>
        <th scope="col">原価</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="foodContent in foodContents" :key="foodContent.id">
        <td>{{ foodContent.foodName }}</td>
        <td>
          {{ foodContent.foodAmount }}
          {{ foodContent.foodUnit }}
        </td>
        <td>{{ foodContent.foodAmountCost }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  computed: {
    foodContents() {
      const recipe = this.$store.getters['recipe/recipes'][0]
      if (!recipe.foods) {
        return
      }
      return recipe.foods
    }
  }
}
</script>

<style scoped></style>
