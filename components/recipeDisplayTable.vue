<template>
  <div>
    <div class="table-message">
      <strong>{{ recipeTableFoods.length }}</strong>
      <span>個の食材を使用</span>
    </div>
    <table class="table mb-0 table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">食材名</th>
          <th scope="col">使用量</th>
          <th scope="col">原価(円/単位)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipeFood in recipeTableFoods" :key="recipeFood.id">
          <td>{{ recipeFood.foodName }}</td>
          <td>
            {{ recipeFood.foodAmount }}
            {{ recipeFood.foodUnit }}
          </td>
          <td>{{ recipeFood.foodAmountCost }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    recipeTableFoods: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* 食材テーブル */
.table tbody {
  background-color: #fff;
}

.table td {
  cursor: pointer;
  border-color: #ffc107;
}

/* /食材テーブル */
</style>
