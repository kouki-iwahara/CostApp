<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <bread-crumb>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item active"
              aria-current="page"
            >
              食材
            </li>
          </bread-crumb>
          <nav-tab
            :is-view-active="isViewActive"
            :param-id-page="`/home/food/${$route.params.foodId}`"
            :register-page="`/home/food/register`"
          >
            <button
              slot="btn"
              type="button"
              class="nav-btn btn btn-warning btn-md"
              @click="toUpdatePage"
            >
              <nuxt-link
                :to="`/home/food/update/${food.paramId}`"
                class="nav-link"
              >
                変更
              </nuxt-link>
            </button>
          </nav-tab>
        </div>
        <!-- /content_header -->
        <div class="content_form col-sm-4">
          <div class="card card-list">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div>
                  <strong>食材名</strong>
                </div>
                <span>{{ foods.name }}</span>
              </li>
              <li class="list-group-item">
                <div>
                  <strong>仕入価格</strong>
                </div>
                <span>{{ foods.value }}円</span>
              </li>
              <li class="list-group-item">
                <div>
                  <strong>食材量</strong>
                </div>
                <span>{{ foods.amount }}{{ foods.unit }}</span>
              </li>
              <li class="list-group-item">
                <div>
                  <strong>歩留り</strong>
                </div>
                <span>{{ foods.yield }}％</span>
              </li>
              <li class="list-group-item">
                <div>
                  <strong>原価/単位</strong>
                </div>
                <span>{{ foods.cost }}円/{{ foods.unit }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="content_image col-sm-6">
          <div class="card">
            <food-image :image="foods.image" />
          </div>
        </div>
        <!--  -->
        <div class="content_comment col-sm-10">
          <div class="card">
            <span class="card-header">コメント</span>
            <div class="card-body">
              {{ foods.comment }}
            </div>
          </div>
        </div>
        <div class="content_table col-sm-10">
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
              <tr
                v-for="recipe in matchedRecipes"
                :key="recipe.id"
                @click="toRecipePage(matchedRecipes.indexOf(recipe))"
              >
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
      <div slot="sidebar_search">
        <search-bar v-model="searchText" placeholder="食材名を検索" />
      </div>
      <ul
        v-for="item in sideBarfoods"
        v-show="sideBarfoods.length"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
        @click="toFoodPage(sideBarfoods.indexOf(item))"
      >
        <li class="food-list_item list-group-item border-bottom">
          {{ item.name }}
        </li>
      </ul>
      <div
        v-show="!sideBarfoods.length"
        slot="content-list"
        class="no-result-message"
      >
        <p>登録がありません</p>
      </div>
    </side-bar>
  </div>
</template>

<script>
import NavTab from '~/components/home/NavTab.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import SideBar from '~/components/SideBar.vue'
import searchBar from '~/components/common/searchBar.vue'
import FoodImage from '~/components/FoodImage.vue'

export default {
  components: {
    SideBar,
    searchBar,
    FoodImage,
    NavTab,
    BreadCrumb
  },
  data() {
    return {
      food: {
        paramId: ''
        // image: require('~/assets/pasta.jpg')
      },
      searchText: '',
      isViewActive: true
    }
  },
  computed: {
    // サイドバーの食材（全ての食材）
    sideBarfoods() {
      const filterFoods = []
      const foods = this.$store.getters['food/foods'].slice()
      if (!this.searchText) {
        return foods
      }
      foods.forEach((food) => {
        if (food.name.includes(this.searchText)) {
          filterFoods.push(food)
        }
      })
      return filterFoods
    },
    // 右ページに表示する食材
    foods() {
      // 受け取ったクエリを整数に変換
      const foods = this.$store.getters['food/foods']
      // 一致するidのデータを取得
      const food = foods.find((food) => {
        return food.id === this.food.paramId
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
          return recipeFood.foodId === this.food.paramId
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
    this.food.paramId = parseInt(this.$route.params.foodId)
    console.log(this.foods)
  },
  methods: {
    // サイドバーから選択された食材のページへ遷移
    toFoodPage(index) {
      const food = this.sideBarfoods[index]
      console.log(food)
      this.$router.push({ path: `/home/food/${food.id}` })
    },
    // 更新ページへ遷移
    toUpdatePage() {
      this.$router.push({
        path: `/home/food/update/${this.food.paramId}/?matchedRecipes=${this.matchedRecipes.length}`
      })
    },
    // 選択されたレシピのページへ遷移
    toRecipePage(index) {
      const recipe = this.matchedRecipes[index]
      console.log(recipe)
      this.$router.push({ path: `/home/recipe/${recipe.id}` })
    }
  }
}
</script>

<style scoped>
/* サブヘッダー */
.nav-btn {
  display: block;
  margin: 0 0 0 auto;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
}
.nav-btn .nav-link {
  border: none;
  padding: 0;
  color: #fff;
}
/* /サブヘッダー */

/* レシピデータのリスト */
.card-header {
  padding: 6px 20px;
}

.card-body {
  padding: 12px 20px;
}

.content_image {
  margin: 0 auto 20px 0;
}

.content_form {
  margin: 0 0 20px auto;
}

.content_comment {
  margin: 0 auto;
}

.content_table {
  margin: 0 auto;
}

/* /レシピデータのリスト */

/* テーブル */
.table tbody {
  background-color: #fff;
}
.table td {
  cursor: pointer;
  border-color: #ffc107;
}
.table-message {
  margin-top: 20px;
}
/* /テーブル */

/* サイドバー */
.no-result-message {
  text-align: center;
}
/* /サイドバー */
</style>
