<template>
  <div>
    <div class="user-name">
      <strong>{{ this.$store.state.user.user.email }}さんのマイページ</strong>
    </div>
    <navbar />
    <div class="form  col-sm-6">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="..."
          aria-label="..."
          aria-describedby="button-addon2"
        />
        <div class="input-group-append">
          <button id="button-addon2" class="btn btn-orange">New</button>
        </div>
      </div>
    </div>

    <div class="card">
      <table class="table mb-0 table-hover">
        <thead class="thead">
          <tr>
            <th scope="col">食材名</th>
            <th scope="col">原価(円)</th>
            <th scope="col">作成日</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="food in foods"
            :key="food.id"
            @click="toFoodIdPage($store.getters['food/foods'].indexOf(food))"
          >
            <td>{{ food.name }}</td>
            <td>{{ food.cost }}{{ `/${food.unit}` }}</td>
            <td>{{ food.createdAt.substring(0, 10) }}</td>
            <td>{{ food.updatedAt.substring(0, 10) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/common/Navbar.vue'

export default {
  components: {
    Navbar
  },
  computed: {
    foods() {
      return this.$store.getters['food/foods']
    }
  },
  methods: {
    // 画面遷移時にfoodIdを渡す
    toFoodIdPage(index) {
      const food = this.$store.getters['food/foods'][index]
      this.$router.push({ path: `/food/foodCheckPage?foodId=${food.id}` })
    }
  }
}
</script>

<style scoped>
.user-name {
  font-size: 1.25em;
  margin: 20px 0;
}
.form {
  margin: 20px auto;
}
.form .input-group .form-control {
  border-radius: 0.25em;
}
.test {
  display: inline;
}
.input-group-append .btn-orange {
  color: #fff;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  height: 38px;
  margin-left: 20px;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
  /* background-image: linear-gradient(-180deg, #fc4a1a, #f7b733 90%); */
}

/*  */
.table {
  margin-top: 50px;
}

.table th {
  border-top: none;
}
.table td {
  cursor: pointer;
}
</style>
