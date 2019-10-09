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
      <tr v-for="food in foodContents" :key="food.id">
        <td>{{ food.name }}</td>
        <td>
          {{ food.amount }}
          {{ food.unit }}
        </td>
        <td>{{ food.totalCost }}</td>
        <td>
          <button
            type="button"
            class="btn btn-success rounded-circle p-0"
            style="width:2rem;height:2rem;"
            @click="
              deleteFood($store.getters['recipe/foodContents'].indexOf(food))
            "
          >
            {{ food.delBtn }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  computed: {
    foodContents() {
      return this.$store.getters['recipe/foodContents']
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
