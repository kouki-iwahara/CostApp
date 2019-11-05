<template>
  <div>
    <div class="table-message">
      <strong>{{ recipeTableFoods.length }}</strong>
      <span>個の食材を使用</span>
    </div>
    <table
      class="table mb-0"
      :class="{ 'table-hover': tableHover, 'table-pointer': tablePointer }"
    >
      <thead class="thead-dark">
        <tr>
          <th scope="col">食材名</th>
          <th scope="col">使用量</th>
          <th scope="col">原価<small>(円/単位)</small></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="recipeFood in recipeTableFoods"
          :key="recipeFood.id"
          @click="toFoodPage(recipeTableFoods.indexOf(recipeFood))"
        >
          <td>{{ recipeFood.foodName }}</td>
          <td>
            {{ recipeFood.foodAmount }}
            {{ recipeFood.foodUnit }}
          </td>
          <td>
            {{ recipeFood.foodAmountCost }}{{ `/${recipeFood.foodUnit}` }}
          </td>
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
    },
    tableHover: {
      type: Boolean,
      default: true
    },
    tablePointer: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toFoodPage(index) {
      this.$emit('toFoodPage', index)
    }
  }
}
</script>

<style scoped>
/* 食材テーブル */
.table tbody {
  background-color: #fff;
}

.table-pointer {
  cursor: pointer;
}

.table td {
  border-color: #ffc107;
}

/* /食材テーブル */
</style>
