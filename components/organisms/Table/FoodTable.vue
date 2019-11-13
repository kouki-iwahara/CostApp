<template>
  <table class="table mb-0 table-hover">
    <thead class="thead-dark">
      <tr>
        <th scope="col">食材名</th>
        <th scope="col">原価<small>(円/単位)</small></th>
        <th scope="col">作成日</th>
        <th scope="col">最終更新</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="food in foods"
        :key="food.id"
        @click="toFoodPage(foods.indexOf(food))"
      >
        <td>{{ food.name }}</td>
        <td>{{ food.cost }}{{ `/${food.unit}` }}</td>
        <td>{{ food.createdAt.substring(0, 10) }}</td>
        <td>{{ food.updatedAt.substring(0, 10) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    foods: {
      type: Array,
      default: null
    }
  },
  methods: {
    // レシピ詳細画面へ遷移
    toFoodPage(index) {
      this.$emit('toFoodPage', index)
    }
  }
}
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
