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
      <tr v-for="recipeFood in recipeFoods" :key="recipeFood.id">
        <td>{{ recipeFood.foodName }}</td>
        <td>
          {{ recipeFood.foodAmount }}
          {{ recipeFood.foodUnit }}
        </td>
        <td>{{ recipeFood.foodAmountCost }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    recipeFoods: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
