<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_image col-sm-12">
          <food-image :image="food.image" />
        </div>
        <div class="content_form col-sm-12">
          <food-content class="content_form_food-content">
            <template slot="content-label">
              食材名
            </template>
            <template slot="food-content">
              {{ food.name }}
            </template>
          </food-content>
          <food-content class="content_form_food-content">
            <template slot="content-label">
              ￥価格
            </template>
            <template slot="food-content">
              {{ food.value }}
            </template>
          </food-content>
          <food-content class="content_form_food-content">
            <template slot="content-label">
              食材量
            </template>
            <template slot="food-content">
              {{ food.amount }}
              {{ food.unit }}
            </template>
          </food-content>
          <food-content class="content_form_food-content">
            <template slot="content-label">
              歩留り
            </template>
            <template slot="food-content">
              {{ food.yield }}
            </template>
          </food-content>
          <food-content class="content_form_food-content">
            <template slot="content-label">
              原価
            </template>
            <template slot="food-content">
              {{ food.cost }}
            </template>
          </food-content>
        </div>
        <div class="content_text col-sm-12">
          <div class="content_text_box border border-dark">
            <p>
              {{ food.comment }}
            </p>
          </div>
        </div>
        <div class="update-btn col-sm-6 ">
          <button
            type="button"
            class="btn btn-info btn-block btn-lg"
            @click="toUpdatePage"
          >
            {{ food.updateBtn }}
          </button>
        </div>
      </div>
      <!-- /content row -->
    </div>
    <side-bar>
      <ul
        v-for="item in foods"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
        @click="showFood($store.getters['food/foods'].indexOf(item))"
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
import FoodContent from '~/components/FoodContent.vue'

export default {
  components: {
    SideBar,
    FoodImage,
    FoodContent
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
  top: 70px;
  bottom: 0;
  right: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
.content_form {
  margin-top: 30px;
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

.update-btn {
  margin: 30px auto;
}
</style>
