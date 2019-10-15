<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_image col-sm-12">
          <food-image :image="recipe.image" />
        </div>
        <!-- /content_image -->
        <div class="content_form col-sm-12">
          <!-- レシピ名 -->
          <food-content class="content_form_food-content">
            <span slot="content-label">レシピ名</span>
            <strong slot="food-content" class="food-content_label-value">
              {{ recipe.name }}
            </strong>
          </food-content>
          <!-- 売価格 -->
          <food-content class="content_form_food-content">
            <span slot="content-label">￥売価格</span>
            <strong slot="food-content" class="food-content_label-value">
              {{ recipe.value }}
            </strong>
          </food-content>
          <!-- 原価 -->
          <food-content class="content_form_food-content">
            <template slot="content-label">
              原価
            </template>
            <template slot="food-content">
              {{ recipe.cost }}
            </template>
          </food-content>
          <!-- 原価率 -->
          <food-content class="content_form_food-content">
            <template slot="content-label">
              原価率
            </template>
            <template slot="food-content">
              {{ recipe.costRate }}
            </template>
          </food-content>
          <!-- 登録ボタン -->
          <div class="row">
            <div class="btn-form col-sm-12">
              <button type="button" class="btn btn-info btn-block btn-lg">
                {{ recipe.updateBtn }}
              </button>
            </div>
          </div>
        </div>
        <!-- コメント欄 -->
        <div class="content_text col-sm-12">
          <div class="content_text_box border border-dark">
            <p>
              {{ recipe.comment }}
            </p>
          </div>
        </div>
        <!-- /content_form -->
      </div>
      <!-- row -->
      <div class="row offset-3">
        <div class="col-sm-12">
          <recipe-display-table />
        </div>
      </div>
    </div>
    <!-- /container-fluid -->
    <side-bar>
      <p slot="content">
        全てのレシピ
      </p>
      <ul
        v-for="item in recipes"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
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
import RecipeDisplayTable from '~/components/RecipeDisplayTable.vue'

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
        name: '',
        value: '',
        cost: '',
        costRate: '',
        comment: '',
        image: require('~/assets/pasta.jpg')
      }
    }
  },
  computed: {
    // レシピが登録されていたらサイドバーに表示する
    recipes() {
      const recipes = this.$store.getters['recipe/recipes']
      // 取得できなければ何も表示しない
      if (!recipes) {
        return
      }
      return recipes
    }
  },
  created() {
    // レシピ配列の先頭を表示
    console.log(this.$store.getters['recipe/recipes'][0])
    const recipe = this.$store.getters['recipe/recipes'][0]
    if (recipe) {
      this.recipe.name = recipe.name
      this.recipe.value = recipe.value
      this.recipe.cost = recipe.cost
      this.recipe.costRate = recipe.costRate
      this.recipe.comment = recipe.comment
      this.recipe.image = recipe.image
      this.recipe.updateBtn = recipe.updateBtn
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
