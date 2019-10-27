<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">食材名</th>
        <th scope="col">使用量</th>
        <th scope="col">原価(円/単位)</th>
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
        <td>{{ food.foodAmountCost }}/{{ food.foodUnit }}</td>
        <td>
          <button
            type="button"
            class="del-btn btn btn-warning rounded-circle p-0"
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

<style scoped>
.del-btn {
  color: rgb(72, 72, 72);
  border-radius: 0.25em;
  background-color: #f1e05a;
  background-image: linear-gradient(-180deg, #f1e05a, #d8c114 90%);
}
</style>
