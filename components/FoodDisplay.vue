<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_image col-sm-6">
          <div class="card">
            <div class="card-header bg-transparent">
              {{ food.name }}
            </div>
            <food-image :image="food.image" />
            <div class="card-footer bg-transparent">
              <span>
                原価/単位
              </span>
              <strong class="float-right"
                >{{ food.cost }}円/{{ food.unit }}</strong
              >
            </div>
          </div>
        </div>
        <!--  -->
        <div class="content_form col-sm-6">
          <div class="btn-form float-right">
            <button
              type="button"
              class="btn-form_update btn btn-warning btn-md"
              @click="toUpdatePage"
            >
              {{ food.updateBtn }}
            </button>
          </div>
          <div class="card card-list">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                仕入価格<strong class="float-right"
                  >{{ food.value }}<span>円</span></strong
                >
              </li>
              <li class="list-group-item">
                食材量<strong class="float-right"
                  >{{ food.amount }}<span>{{ food.unit }}</span></strong
                >
              </li>
              <li class="list-group-item">
                歩留り<strong class="float-right"
                  >{{ food.yield }}<span>％</span></strong
                >
              </li>
            </ul>
            <div class="card-body">
              <div class="card-body_comment">
                <span>コメント</span>
              </div>
              <p class="card-text">
                {{ food.comment }}
              </p>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="col-sm-12">
          <table class="table mb-0 table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">レシピ名</th>
                <th scope="col">原価(円)</th>
                <th scope="col">原価率(％)</th>
                <th scope="col">作成日</th>
                <th scope="col">最終更新</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="recipe in filterRecipes" :key="recipe.id">
                <td>{{ recipe.name }}</td>
                <td>{{ recipe.cost }}</td>
                <td>{{ recipe.costRate }}</td>
                <td>{{ recipe.createdAt.substring(0, 10) }}</td>
                <td>{{ recipe.updatedAt.substring(0, 10) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--  -->
      </div>
      <!-- /content row -->
    </div>
    <side-bar>
      <ul
        v-for="item in foods"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
        @click="showFood(foods.indexOf(item))"
      >
        <li class="food-list_item list-group-item border-bottom border-info">
          {{ item.name }}
        </li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
import SideBar from '~/components/SideBar.vue'
import FoodImage from '~/components/FoodImage.vue'

export default {
  components: {
    SideBar,
    FoodImage
  },
  data() {
    return {
      food: {
        name: '',
        value: '',
        amount: '',
        yield: '',
        unit: '',
        cost: '',
        comment: '',
        updateBtn: '変更',
        image: require('~/assets/pasta.jpg')
      },
      selectedFile: '',
      foodIndex: 0
    }
  },
  computed: {
    foods() {
      return this.$store.getters['food/foods']
    },
    filterRecipes() {
      const recipes = this.$store.getters['recipe/recipes']
      return recipes
    }
  },
  created() {
    // 受け取ったクエリを整数に変換
    const foodId = parseInt(this.$route.query.foodId)
    const foods = this.$store.getters['food/foods']
    // 一致するidのデータを取得
    const food = foods.find((food) => {
      return food.id === foodId
    })
    console.log(food)
    if (food) {
      this.food.name = food.name
      this.food.value = food.value
      this.food.amount = food.amount
      this.food.yield = food.yield
      this.food.unit = food.unit
      this.food.cost = food.cost
      this.food.comment = food.comment
      this.food.updateBtn = food.updateBtn
      this.food.image = food.image
    }
    if (!food.comment) {
      this.food.comment = '未設定'
    }
  },
  methods: {
    showFood(index) {
      const food = this.$store.getters['food/foods'][index]
      console.log(food)
      this.food.name = food.name
      this.food.value = food.value
      this.food.amount = food.amount
      this.food.yield = food.yield
      this.food.unit = food.unit
      this.food.cost = food.cost
      this.food.comment = food.comment
      this.food.image = food.image
      this.foodIndex = index
      if (!food.comment) {
        this.food.comment = '未設定'
      }
    },
    toUpdatePage() {
      this.$router.push({ path: `/food/${this.foodIndex}` })
    }
  }
}
</script>

<style scoped>
.content {
  padding-top: 25px;
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
.card-list {
  margin-top: 43px;
}
.card-header {
  font-size: 1.25em;
  font-weight: 600;
}
.card-body {
  padding: 12px 20px;
}

.card-body_comment {
  margin-bottom: 10px;
}

.content_form_food-content {
  margin-bottom: 15px;
}
.content_form_cost strong {
  font-size: 1.5em;
}
.content_form_cost strong small {
  margin-left: 5px;
}

.content_text {
  margin: 20px 0;
}

.btn-form:hover {
  opacity: 0.9;
}
.btn-form_update {
  color: #fff;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
}
</style>
