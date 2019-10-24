<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <bread-crumb>
            <li slot="breadcrumb-item" class="breadcrumb-item">
              <nuxt-link to="/home/food" class="nav-link">
                マイページ
              </nuxt-link>
            </li>
            <li slot="breadcrumb-item" class="breadcrumb-item">
              <nuxt-link to="/home/food" class="nav-link">
                食材
              </nuxt-link>
            </li>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item active"
              aria-current="page"
            >
              表示
            </li>
          </bread-crumb>
          <nav-tab
            :is-view-active="isViewActive"
            :param-id-page="`/home/food/${food.id}`"
            :register-page="`/home/food/register`"
          >
            <div slot="btn-form" class="btn-form">
              <button
                type="button"
                class="btn-form_update btn btn-warning btn-md"
                @click="toUpdatePage"
              >
                <nuxt-link
                  :to="`/home/food/update/${food.id}`"
                  class="nav-link"
                >
                  変更
                </nuxt-link>
              </button>
            </div>
          </nav-tab>
        </div>
        <!-- /content_header -->
        <div class="content_image col-sm-6">
          <div class="card">
            <div class="card-header bg-transparent">
              {{ foods.name }}
            </div>
            <food-image :image="foods.image" />
            <div class="card-footer bg-transparent">
              <span>
                原価/単位
              </span>
              <strong class="float-right"
                >{{ foods.cost }}円/{{ foods.unit }}</strong
              >
            </div>
          </div>
        </div>
        <!--  -->
        <div class="content_form col-sm-6">
          <div class="card card-list">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                仕入価格<strong class="float-right"
                  >{{ foods.value }}<span>円</span></strong
                >
              </li>
              <li class="list-group-item">
                食材量<strong class="float-right"
                  >{{ foods.amount }}<span>{{ foods.unit }}</span></strong
                >
              </li>
              <li class="list-group-item">
                歩留り<strong class="float-right"
                  >{{ foods.yield }}<span>％</span></strong
                >
              </li>
            </ul>
            <div class="card-body">
              <div class="card-body_comment">
                <span>コメント</span>
              </div>
              <p class="card-text">
                {{ foods.comment }}
              </p>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="col-sm-12">
          <div class="table-message">
            <strong>{{ matchedRecipes.length }}</strong>
            <span>個のレシピで使用中</span>
          </div>
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
              <tr v-for="recipe in matchedRecipes" :key="recipe.id">
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
      <strong slot="sidebar_content">登録中の食材</strong>
      <ul
        v-for="item in sideBarfoods"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
        @click="showFood(sideBarfoods.indexOf(item))"
      >
        <li class="food-list_item list-group-item border-bottom">
          {{ item.name }}
        </li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
import SideBar from '~/components/SideBar.vue'
import FoodImage from '~/components/FoodImage.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import NavTab from '~/components/home/NavTab.vue'

export default {
  components: {
    SideBar,
    FoodImage,
    BreadCrumb,
    NavTab
  },
  data() {
    return {
      food: {
        id: ''
        // image: require('~/assets/pasta.jpg')
      },
      isViewActive: true
    }
  },
  computed: {
    // サイドバーの食材（全ての食材）
    sideBarfoods() {
      return this.$store.getters['food/foods']
    },
    // 右ページに表示する食材
    foods() {
      // 受け取ったクエリを整数に変換
      const foodId = parseInt(this.food.id)
      const foods = this.$store.getters['food/foods']
      // 一致するidのデータを取得
      const food = foods.find((food) => {
        return food.id === foodId
      })
      return food
    },
    // 選択された食材を使っているレシピを表示
    matchedRecipes() {
      const recipes = this.$store.getters['recipe/recipes']
      const matchedRecipes = []
      // 食材idと一致するレシピ食材を取得
      recipes.forEach((recipe) => {
        const recipeFood = recipe.foods.find((recipeFood) => {
          return recipeFood.foodId === parseInt(this.food.id)
        })
        // レシピ食材が取得できたら一致するレシピを取得
        if (recipeFood) {
          const recipe = recipes.find((recipe) => {
            return recipe.id === recipeFood.recipeId
          })
          matchedRecipes.push(recipe)
        }
      })
      return matchedRecipes
    }
  },
  created() {
    // 受け取ったparamsを代入
    this.food.id = this.$route.params.foodId
    console.log(this.foods)
  },
  methods: {
    // サイドバーから選択された食材のページへ遷移
    showFood(index) {
      const food = this.$store.getters['food/foods'][index]
      console.log(food)
      this.$router.push({ path: `/home/food/${food.id}` })
    },
    // 更新ページへ遷移
    toUpdatePage() {
      this.$router.push({ path: `/home/food/update/${this.food.id}` })
    }
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
.content_header {
  background-color: #f4f5f7;
  padding: 0;
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
.content_form {
  margin-top: 10px;
}

.content_image,
.content_form {
  margin-top: 20px;
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
.btn-form {
  margin: 0 0 0 auto;
}
.btn-form:hover {
  opacity: 0.9;
}
.btn-form_update {
  margin-right: 15px;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
}
.btn-form_update .nav-link {
  border: none;
  padding: 0;
  color: #fff;
}
/*  */
.table tbody {
  background-color: #fff;
}
.table td {
  border-color: #ffc107;
}
.table-message {
  margin-top: 20px;
}
/*  */
.border-bottom {
  border-color: #f7b733;
}
.list-group-flush:last-child .list-group-item:last-child {
  border-bottom: 1px solid #f7b733;
}
</style>
