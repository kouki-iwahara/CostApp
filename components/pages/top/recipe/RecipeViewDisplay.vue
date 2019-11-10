<template>
  <div>
    <div class="content container-fluid">
      <!-- サブヘッダー始まり -->
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <!-- パンくずリスト -->
          <bread-crumb link="/" list-name="レシピ">
            <span slot="link-name">トップ</span>

            <list-item slot="list-item" class="breadcrumb-item">
              <nuxt-link to="/recipe" class="nav-link">
                レシピ一覧
              </nuxt-link>
            </list-item>
          </bread-crumb>
        </div>
      </div>
      <!-- サブヘッダー終わり -->

      <!-- レシピデータ始まり -->
      <div class="row offset-3">
        <!-- データリスト -->
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
                  <strong>原価</strong>
                </div>
                <span>{{ computedRecipe.cost }}円</span>
              </li>
            </ul>
          </div>
        </div>

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
      <!-- レシピデータリスト終わり -->

      <!-- レシピの食材テーブル-->
      <div class="row offset-3">
        <div class="content_table col-sm-10">
          <recipe-display-table
            :recipe-table-foods="computedRecipe.foods"
            :table-hover="isTableHover"
            :table-pointer="isTablePointer"
          />
        </div>
      </div>
    </div>
    <!-- /content -->

    <!-- サイドバー -->
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
import ListItem from '~/components/atoms/List/ListItem'
import SideBar from '~/components/SideBar.vue'
import BreadCrumb from '~/components/molecules/BreadCrumb/BreadCrumb'
import searchBar from '~/components/common/searchBar.vue'
import FoodImage from '~/components/FoodImage.vue'
import RecipeDisplayTable from '~/components/RecipeDisplayTable.vue'

export default {
  components: {
    ListItem,
    SideBar,
    BreadCrumb,
    searchBar,
    FoodImage,
    RecipeDisplayTable
  },
  data() {
    return {
      recipe: {
        id: ''
        // image: require('~/assets/pasta.jpg')
      },
      searchText: '',
      isTableHover: false,
      isTablePointer: false
    }
  },
  computed: {
    // レシピが登録されていたらサイドバーに表示する
    sideBarRecipes() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/allUsersRecipes']
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
      const recipes = this.$store.getters['recipe/allUsersRecipes']
      // 受け取ったparamsのidと一致するレシピを取得
      const recipe = recipes.find((recipe) => {
        return recipe.id === this.recipe.id
      })
      return recipe
    }
  },
  created() {
    // 受け取ったクエリを整数に変換
    this.recipe.id = parseInt(this.$route.params.recipeId)
    console.log(this.recipe.id)
    console.log(this.computedRecipe)
  },
  methods: {
    // サイドバーから選択されたレシピページへ遷移
    toRecipePage(index) {
      const recipe = this.$store.getters['recipe/allUsersRecipes'][index]
      console.log(recipe)
      this.$router.push({ path: `/recipe/${recipe.id}` })
    }
  }
}
</script>

<style scoped>
.nav-link {
  padding: 0;
  display: inline-block;
}
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
