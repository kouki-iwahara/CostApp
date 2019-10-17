<template>
  <table class="table">
    <thead class="thead-light">
      <tr>
        <th scope="col">食材名</th>
        <th scope="col">使用量</th>
        <th scope="col">原価</th>
        <th scope="col">取消</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="food in recipeTableFoods" :key="food.id">
        <td>{{ food.foodName }}</td>
        <td>
          {{ food.foodAmount }}
          {{ food.foodUnit }}
        </td>
        <td>{{ food.foodAmountCost }}</td>
        <td>
          <button
            type="button"
            class="btn btn-success rounded-circle p-0"
            style="width:2rem;height:2rem;"
            @click="deleteFood(recipeTableFoods.indexOf(food))"
          >
            {{ food.foodDelBtn }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    recipeTableFoods: {
      type: Array,
      default: null
    }
  },
  methods: {
    // テーブルから食材を削除
    deleteFood(index) {
      this.$emit('deleteFood', index)
    }
  }
}
</script>

<style scoped></style>
