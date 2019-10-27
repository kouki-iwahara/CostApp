<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_image col-sm-12">
          <food-image :image="computedRecipe.image" />
        </div>
        <!-- /content_image -->
        <div class="content_form col-sm-12">
          <!-- レシピ名 -->
          <food-content class="content_form_food-content">
            <span slot="content-label">レシピ名</span>
            <strong slot="food-content" class="food-content_label-value">
              {{ computedRecipe.name }}
            </strong>
          </food-content>
          <!-- 売価格 -->
          <food-content class="content_form_food-content">
            <span slot="content-label">￥売価格</span>
            <strong slot="food-content" class="food-content_label-value">
              {{ computedRecipe.value }}
            </strong>
          </food-content>
          <!-- 原価 -->
          <food-content class="content_form_food-content">
            <template slot="content-label">
              原価
            </template>
            <template slot="food-content">
              {{ computedRecipe.cost }}
            </template>
          </food-content>
          <!-- 原価率 -->
          <food-content class="content_form_food-content">
            <template slot="content-label">
              原価率
            </template>
            <template slot="food-content">
              {{ computedRecipe.costRate }}
            </template>
          </food-content>
        </div>
        <!-- コメント欄 -->
        <div class="content_text col-sm-12">
          <div class="content_text_box border border-dark">
            <p>
              {{ computedRecipe.comment }}
            </p>
          </div>
        </div>
        <!-- /content_form -->
      </div>
      <!-- row -->
      <div class="row offset-3">
        <div class="col-sm-12">
          <recipe-display-table :recipe-table-foods="computedRecipe.foods" />
        </div>
        <div class="btn-form col-sm-6">
          <button
            type="button"
            class="btn btn-info btn-block btn-lg"
            @click="toUpdatePage"
          >
            変更
          </button>
        </div>
      </div>
    </div>
    <!-- /container-fluid -->
    <side-bar>
      <p slot="content">
        全てのレシピ
      </p>
      <ul
        v-for="item in sidebarRecipes"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
        @click="showRecipe(sidebarRecipes.indexOf(item))"
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
import RecipeDisplayTable from '~/components/RecipeDisplayTable.vue'
import FoodContent from '~/components/FoodContent.vue'

export default {
  components: {
    SideBar,
    FoodImage,
    FoodContent,
    RecipeDisplayTable
  },
  data() {
    return {
      recipe: {
        paramId: ''
      }
    }
  },
  computed: {
    // サイドバーに表示するレシピ
    sidebarRecipes() {
      const recipes = this.$store.getters['recipe/recipes'].slice()
      return recipes
    },
    // 右ページに表示するレシピ
    computedRecipe() {
      const recipes = this.$store.getters['recipe/recipes']
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
    console.log(this.recipes)
  },
  methods: {
    // 選択されたレシピのページへ遷移
    showRecipe(index) {
      const recipe = this.$store.getters['recipe/recipes'][index]
      console.log(recipe)
      this.$router.push({ path: `/home/recipe/${recipe.id}` })
    },
    toUpdatePage() {
      this.$router.push({ path: `/recipe/${this.recipe.index}` })
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
.content_image_file {
  margin: 10px 0;
}
.content_form {
  margin-top: 30px;
}
.content_form_food-content {
  margin-bottom: 10px;
}
.content_form_cost {
  margin-bottom: 20px;
}
.content_form_cost strong {
  display: block;
  font-size: 1.5rem;
}

.food-add-to-menu-form {
  margin-bottom: 20px;
}
.content_form .input-group {
  padding-bottom: 20px;
}
.btn-form_checkbox {
  margin-bottom: 5px;
}
.btn-form {
  margin: 0 auto;
}
</style>
