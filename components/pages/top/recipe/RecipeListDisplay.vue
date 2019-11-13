<template>
  <div class="content container-fluid">
    <!-- ヘッド部分始まり -->
    <div class="row">
      <div class="content_header col-sm-6">
        <bread-crumb :link="`/`" list-name="レシピ一覧">
          <span slot="link-name">トップ</span>
        </bread-crumb>
      </div>
      <div class="col-sm-12">
        <div class="content_title border-bottom">
          <strong>レシピ一覧</strong>
        </div>
      </div>
    </div>
    <!-- ヘッド部分終わり -->

    <div class="row">
      <!-- 検索バー -->
      <div class="search-bar col-sm-6">
        <text-input v-model="searchText" placeholder="レシピを検索" />
      </div>
      <!-- メッセージ -->
      <div class="col-sm-12 d-flex justify-content-between">
        <div>
          <strong-text>
            {{ recipes.length }}
          </strong-text>
          個のレシピを公開中
        </div>
        <new-create-btn link="/home/recipe/register" />
      </div>
    </div>

    <!-- テーブル -->
    <div class="row">
      <div class="col-sm-12">
        <!-- min-width: 576pxから切り替わる -->
        <recipe-table
          class="window-table"
          :recipes="recipes"
          @toRecipePage="toRecipePage"
        />
        <mobile-recipe-table
          class="mobile-table"
          :recipes="recipes"
          @toRecipePage="toRecipePage"
        />
      </div>
    </div>
    <!-- テーブル終わり -->
  </div>
</template>

<script>
import BreadCrumb from '~/components/molecules/BreadCrumb/BreadCrumb.vue'
import textInput from '~/components/atoms/TextBox/TextInput'
import StrongText from '~/components/atoms/Text/StrongText'
import NewCreateBtn from '~/components/molecules/Btn/NewCreateBtn'
import RecipeTable from '~/components/organisms/Table/RecipeTable'
import MobileRecipeTable from '~/components/organisms/MobileTable/MobileRecipeTable'

export default {
  components: {
    BreadCrumb,
    textInput,
    StrongText,
    NewCreateBtn,
    RecipeTable,
    MobileRecipeTable
  },
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    // 検索バーとレンダリングさせてテーブルにレシピを表示する
    recipes() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/allUsersRecipes']
      if (!this.searchText) {
        return recipes
      }
      // 検索のテキストを含む名前を表示する
      recipes.forEach((recipe) => {
        if (recipe.name.includes(this.searchText)) {
          filterRecipes.push(recipe)
        }
      })
      return filterRecipes
    }
  },
  methods: {
    // 画面遷移時にfoodIdを渡す
    toRecipePage(index) {
      const recipe = this.recipes[index]
      console.log(recipe)
      this.$router.push({ path: `/home/recipe/${recipe.id}` })
    }
  }
}
</script>

<style scoped>
.content_title {
  font-size: 1.25em;
  margin: 20px 15px 30px;
}

.search-bar {
  margin: 0 auto 20px;
}
</style>
