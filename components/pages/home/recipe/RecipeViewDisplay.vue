<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <!-- サブヘッダー始まり -->
        <div class="content_header col-sm-12">
          <!-- パンくずリストとナビタブ -->
          <sub-header
            list-name="レシピ"
            :is-values="$store.getters['recipe/recipes']"
            :param-id-page="`/home/recipe/${recipe.paramId}`"
            :register-page="`/home/recipe/register`"
            :is-view-active="isViewActive"
          >
            <change-btn
              slot="btn"
              class="content_header_btn"
              :link="`/home/recipe/update/${recipe.paramId}`"
            />
          </sub-header>
        </div>
        <!-- サブヘッダー終わり -->

        <!-- レシピデータのリスト始まり -->
        <div class="content_form col-sm-4">
          <div class="card card-list">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div>
                  <strong>レシピ名</strong>
                </div>
                <span>{{ computedRecipe.name }}</span>
              </li>
              <li class="list-group-item">
                <div>
                  <strong>売価格</strong>
                </div>
                <span> {{ computedRecipe.value }}円</span>
              </li>
              <li class="list-group-item">
                <div>
                  <strong>原価</strong>
                </div>
                <span>{{ computedRecipe.cost }}円</span>
              </li>
              <li class="list-group-item">
                <div>
                  <strong>原価率</strong>
                </div>
                <span>{{ computedRecipe.costRate }}%</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- レシピデータのリスト終わり -->

        <!-- 画像 -->
        <div class="content_image col-sm-6">
          <food-image :image="computedRecipe.image" />
        </div>

        <!-- コメント -->
        <div class="content_comment col-sm-10">
          <div class="card">
            <span class="card-header">コメント</span>
            <div class="card-body">
              {{ computedRecipe.comment }}
            </div>
          </div>
        </div>
      </div>
      <!-- row -->

      <!-- レシピの食材 テーブル-->
      <div class="row offset-3">
        <div class="content_table col-sm-10">
          <recipe-display-table
            :recipe-table-foods="computedRecipe.foods"
            @toFoodPage="toFoodPage"
          />
        </div>
      </div>
    </div>
    <!-- /container-fluid -->
    <side-bar>
      <div slot="sidebar_search">
        <search-bar v-model="searchText" placeholder="レシピ名を検索" />
      </div>
      <ul
        v-for="item in sideBarRecipes"
        v-show="sideBarRecipes.length"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
        @click="toRecipePage(sideBarRecipes.indexOf(item))"
      >
        <li class="food-list_item list-group-item border-bottom">
          {{ item.name }}
        </li>
      </ul>
      <div
        v-show="!sideBarRecipes.length"
        slot="content-list"
        class="no-result-message"
      >
        <p>登録がありません</p>
      </div>
    </side-bar>
  </div>
</template>

<script>
import SubHeader from '~/components/organisms/SubHeader/SubHeader'
import ChangeBtn from '~/components/molecules/Btn/ChangeBtn'
import SideBar from '~/components/SideBar.vue'
import searchBar from '~/components/common/searchBar.vue'
import FoodImage from '~/components/FoodImage.vue'
import RecipeDisplayTable from '~/components/RecipeDisplayTable.vue'

export default {
  components: {
    SubHeader,
    ChangeBtn,
    SideBar,
    searchBar,
    FoodImage,
    RecipeDisplayTable
  },
  data() {
    return {
      recipe: {
        paramId: ''
      },
      searchText: '',
      isViewActive: true
    }
  },
  computed: {
    // サイドバーに表示するレシピ
    sideBarRecipes() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/recipes'].slice()
      if (!this.searchText) {
        return recipes
      }
      recipes.forEach((recipe) => {
        if (recipe.name.includes(this.searchText)) {
          filterRecipes.push(recipe)
        }
      })
      return filterRecipes
    },
    // 右ページに表示するレシピ
    computedRecipe() {
      const recipes = this.$store.getters['recipe/recipes'].slice()
      // 受け取ったparamsのidと一致するレシピを取得
      const recipe = recipes.find((recipe) => {
        return recipe.id === this.recipe.paramId
      })
      return recipe
    }
  },
  created() {
    // 受け取ったクエリを整数に変換
    this.recipe.paramId = parseInt(this.$route.params.recipeId)
    console.log(this.computedRecipe)
  },
  methods: {
    // 選択されたレシピのページへ遷移
    toRecipePage(index) {
      const recipe = this.sideBarRecipes[index]
      console.log(recipe)
      this.$router.push({ path: `/home/recipe/${recipe.id}` })
    },
    toUpdatePage() {
      this.$router.push({ path: `/recipe/${this.recipe.index}` })
    },
    // 選択された食材のページへ遷移
    toFoodPage(index) {
      console.log(index)
      const recipeFood = this.computedRecipe.foods[index]
      console.log(recipeFood)
      this.$router.push({ path: `/home/food/${recipeFood.foodId}` })
    }
  }
}
</script>

<style scoped>
/* サブヘッダー */
/* 変更ボタン */
/* .nav-btn {
  display: block;
  margin: 0 0 0 auto;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
} */

.nav-btn .nav-link {
  border: none;
  padding: 0;
  color: #fff;
}

/* /サブヘッダー */

/* レシピのデータリスト */
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
  margin: 0 auto 20px;
}

.content_table {
  margin: 0 auto;
}

/* /レシピのデータリスト */

/* サイドバー */
.no-result-message {
  text-align: center;
}
</style>
