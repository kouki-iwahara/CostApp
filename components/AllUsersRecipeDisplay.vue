<template>
  <div>
    <div class="content container-fluid">
      <!-- サブヘッダー始まり -->
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <!-- パンくずリスト -->
          <bread-crumb>
            <li slot="breadcrumb-item" class="breadcrumb-item">
              <nuxt-link to="/recipe" class="nav-link">
                レシピ一覧
              </nuxt-link>
            </li>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item"
              aria-current="page"
            >
              レシピ
            </li>
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
      <p slot="content">
        全てのレシピ
      </p>
      <ul
        v-for="item in sidebarRecipes"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
        @click="toRecipePage(sidebarRecipes.indexOf(item))"
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
import BreadCrumb from '~/components/BreadCrumb.vue'
import FoodImage from '~/components/FoodImage.vue'
import RecipeDisplayTable from '~/components/RecipeDisplayTable.vue'

export default {
  components: {
    SideBar,
    BreadCrumb,
    FoodImage,
    RecipeDisplayTable
  },
  data() {
    return {
      recipe: {
        id: ''
        // image: require('~/assets/pasta.jpg')
      },
      isTableHover: false,
      isTablePointer: false
    }
  },
  computed: {
    // レシピが登録されていたらサイドバーに表示する
    sidebarRecipes() {
      const recipes = this.$store.getters['recipe/allUsersRecipes']
      return recipes
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
</style>
