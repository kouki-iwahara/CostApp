<template>
  <table class="table mb-0 table-hover">
    <thead class="thead-dark">
      <tr>
        <th scope="col">レシピ名</th>
        <th class="text-right" scope="col">原価<small>(円/単位)</small></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="food in foods"
        :key="food.id"
        @click="toFoodPage(foods.indexOf(food))"
      >
        <td>{{ food.name }}</td>
        <td class="text-right">{{ food.cost }}{{ `/${food.unit}` }}</td>
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

<style></style>
