<template>
  <div>
    <!-- ユーザーネームの表示 -->
    <div class="user-name col-sm-12">
      <user-name />
    </div>

    <!-- ナビゲーション -->
    <div class="col-sm-12">
      <nav-component
        :is-food-inactive="{ inactive: isFoodInactive }"
        :is-recipe-active="{
          active: isRecipeActive
        }"
      />
    </div>

    <!-- 検索バー -->
    <div class="search-bar col-sm-6">
      <text-input v-model="searchText" placeholder="レシピを検索" />
    </div>

    <!-- テーブル上部のメッセージ -->
    <div class="col-sm-12 d-flex justify-content-between">
      <div>
        <strong-text>
          {{ recipes.length }}
        </strong-text>
        個のレシピを公開中
      </div>
      <!-- 新規作成ボタン -->
      <new-create-btn link="/home/recipe/register" />
    </div>

    <!-- テーブル -->
    <div class="col-sm-12">
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
</template>

<script>
import UserName from '~/components/molecules/Text/UserName'
import NavComponent from '~/components/molecules/Nav/NavComponent'
import TextInput from '~/components/atoms/TextBox/TextInput'
import StrongText from '~/components/atoms/Text/StrongText'
import NewCreateBtn from '~/components/molecules/Btn/NewCreateBtn'
import RecipeTable from '~/components/organisms/Table/RecipeTable'
import MobileRecipeTable from '~/components/organisms/MobileTable/MobileRecipeTable'

export default {
  components: {
    UserName,
    TextInput,
    NavComponent,
    StrongText,
    NewCreateBtn,
    RecipeTable,
    MobileRecipeTable
  },
  data() {
    return {
      isFoodInactive: true,
      isRecipeActive: true,
      searchText: ''
    }
  },
  computed: {
    // 食材の検索をリアルタイムで表示
    recipes() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/recipes']
      // 検索していなければ全ての食材を表示
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
.user-name {
  margin: 20px 0;
}

.search-bar {
  margin: 20px auto;
}
</style>
