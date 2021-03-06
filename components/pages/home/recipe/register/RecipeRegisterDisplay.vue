<template>
  <div>
    <div class="content container-fluid">
      <!-- サブヘッダー始まり -->
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <!-- パンくずリスト -->
          <sub-header
            list-name="レシピ"
            :param-id-page="`/home/recipe/${recipe.paramId}`"
            :register-page="`/home/recipe/register`"
            :is-values="$store.getters['recipe/recipes']"
            :is-register-active="isRegisterActive"
          >
            <register-btn
              slot="btn"
              class="content_header_btn"
              :is-click-btn="isClickBtn"
              @registerRecipe="registerRecipe"
            />
          </sub-header>
        </div>
      </div>
      <!-- サブヘッダー終わり -->

      <!-- 入力フォーム始まり -->
      <div class="form-group row  offset-3">
        <div class="col-sm-12">
          <p>
            レシピデータを入力して下さい。（<span class="require-mark">＊</span
            >は必須入力）
          </p>
        </div>
        <!-- テキスト入力始まり -->
        <div class="content_form col-sm-4">
          <div class="row">
            <div class="col-sm-12">
              <!-- レシピ名 -->
              <span class="require-mark">＊</span>
              <strong>レシピ名</strong>
              <input-form
                v-model="recipe.name"
                placeholder="レシピ名を入力"
                type="text"
                class="content_form_input"
              />
              <!-- 売価格 -->
              <strong>売価格<small>(公開されません)</small></strong>
              <input-form
                v-model="recipe.value"
                placeholder="数値を入力"
                type="number"
                class="content_form_input"
              >
                <div slot="input-append" class="input-group-append">
                  <span
                    id="inputGroup-sizing-sm"
                    class="input-group-text rounded-0"
                  >
                    円
                  </span>
                </div>
              </input-form>
              <!-- 原価 -->
              <div class="content_form_label">
                <strong>原価(円)： {{ recipeCost }}</strong>
              </div>
              <!-- 原価率 -->
              <div class="content_form_label">
                <strong>原価率(％): {{ recipeCostRate }}</strong>
              </div>
            </div>
          </div>
          <!-- /row -->
        </div>
        <!-- テキスト入力終わり -->

        <!-- 画像 -->
        <div class="content_image col-sm-6">
          <food-image :image="recipe.image">
            <template slot="input-file">
              <input-file @getFileData="getFileData" />
            </template>
          </food-image>
        </div>
        <!-- コメント -->
        <div class="content_comment col-sm-10">
          <comment-form v-model="recipe.comment" />
        </div>
      </div>
      <!-- 入力フォーム終わり -->

      <!-- 食材登録始まり -->
      <div class="row offset-3">
        <!-- 食材登録フォーム -->
        <div class="food-add-to-menu-form col-sm-10">
          <add-food-form
            v-model="food.amount"
            :food-name="food.name"
            :food-cost="amountCost"
            :food-unit="food.unit"
            @addFoodToRecipe="addFoodToRecipe"
            @initializeForm="initializeForm"
          >
            <add-food-modal
              slot="modal"
              ref="foodModal"
              @showSelectedFood="showSelectedFood"
            />
          </add-food-form>
        </div>
        <!-- 食材テーブル min-width: 768pxまで表示 -->
        <div class="food-table col-sm-10">
          <recipe-register-table
            :recipe-table-foods="recipe.tableFoods"
            @deleteFood="deleteFood"
          />
        </div>

        <!-- スマホ用レシピ食材表示 -->
        <div
          v-for="tableFood in recipe.tableFoods"
          :key="tableFood.id"
          class="mobile-table col-sm-10"
        >
          <div class="mobile-table_content border-bottom">
            <div>
              <strong>{{ tableFood.foodName }}</strong>

              <small>{{ tableFood.foodAmountCost }}円</small>
            </div>
            <div>
              <strong
                >{{ tableFood.foodAmount }}{{ tableFood.foodUnit }}</strong
              >
              <button
                type="button"
                class="del-btn btn btn-warning rounded-circle p-0"
                style="width:1.75rem;height:1.75rem;"
                @click="deleteFood(recipe.tableFoods.indexOf(tableFood))"
              >
                {{ tableFood.foodDelBtn }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 食材登録終わり -->
    </div>
    <!-- /content -->
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
      >
        <li
          class="food-list_item list-group-item border-bottom"
          @click="toRecipePage(sideBarRecipes.indexOf(item))"
        >
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
import RegisterBtn from '~/components/molecules/Btn/RegisterBtn'
import FoodImage from '~/components/FoodImage.vue'
import AddFoodForm from '~/components/AddFoodForm.vue'
import RecipeRegisterTable from '~/components/RecipeRegisterTable.vue'
import CommentForm from '~/components/CommentForm.vue'
import InputForm from '~/components/InputForm.vue'
import SideBar from '~/components/SideBar.vue'
import searchBar from '~/components/common/searchBar.vue'
import InputFile from '~/components/InputFile.vue'
import AddFoodModal from '~/components/organisms/Modal/AddFoodModal'

export default {
  components: {
    SubHeader,
    RegisterBtn,
    FoodImage,
    CommentForm,
    AddFoodForm,
    RecipeRegisterTable,
    InputFile,
    InputForm,
    SideBar,
    searchBar,
    AddFoodModal
  },
  data() {
    return {
      recipe: {
        paramId: '',
        name: '',
        value: '',
        comment: '',
        tableFoods: [],
        foods: [],
        image: require('~/assets/pasta.jpg')
      },
      food: {
        id: '',
        userId: '',
        name: '表示されます',
        amount: '',
        unit: '単位',
        cost: ''
      },
      selectedFile: '',
      searchText: '',
      isRegisterActive: true,
      isClickBtn: false
    }
  },
  computed: {
    // レシピの原価率
    recipeCostRate() {
      const costRate = (this.recipeCost / this.recipe.value) * 100
      if (isFinite(costRate)) {
        return Math.round(costRate * 10) / 10
      }
      return '未設定'
    },
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
    // 食材の使用量に対しての原価
    amountCost() {
      if (this.food.name === '表示されます') {
        return
      }
      const cost = this.food.cost * this.food.amount
      return Math.round(cost * 10) / 10
    },
    // レシピの原価（食材原価の合計）
    recipeCost() {
      let cost = 0
      this.recipe.tableFoods.forEach((tableFood) => {
        cost += parseFloat(tableFood.foodAmountCost)
      })
      return Math.round(cost * 10) / 10
    }
  },
  created() {
    const recipes = this.$store.state.recipe.recipes
    console.log(recipes)
    if (recipes.length !== 0) {
      this.recipe.paramId = recipes[0].id
    }
  },
  methods: {
    // イメージ画像データを取得し、プレビューを作成
    getFileData(fileData) {
      this.selectedFile = fileData
      // ファイルを選んでなければ初期値に戻す
      if (!this.selectedFile) {
        this.recipe.image = require('~/assets/pasta.jpg')
        return
      }
      // プレビューを作成
      this.previewImage(this.selectedFile)
    },
    // 画像のURLを取得しプレビューを表示する
    previewImage(selectedFile) {
      // FileReaderに対応しているか
      if (!window.FileReader) {
        alert('表示できません')
        return
      }
      const reader = new FileReader()
      reader.onload = (fileData) => {
        this.recipe.image = fileData.target.result
      }
      reader.readAsDataURL(selectedFile)
    },
    // 画像のアップロード
    async upLoadImage(selectedFile) {
      // アップロードされた画像のデータを格納
      const upLoadedImageData = await this.$store
        .dispatch('food/upLoadImage', selectedFile)
        .catch((error) => {
          console.log(error.message)
        })
      // 画像の名前を返す
      return upLoadedImageData.ref.name
    },
    // アップロードされた画像のURLを取得
    async getDownloadURL(upLoadedImageName) {
      // 画像URLが格納される
      const url = await this.$store
        .dispatch('food/getDownloadURL', upLoadedImageName)
        .catch((error) => {
          console.log(error.message)
        })
      return url
    },
    // サイドバーから食材を選択して表示する
    showSelectedFood(food) {
      // const food = this.sideBarfoods[index]
      console.log(food)
      // 食材の重複禁止の為、idが重複しているか調べる
      const overlapId = this.recipe.tableFoods.find((tableFood) => {
        return tableFood.id === food.id
      })
      // idが重複していた場合
      if (overlapId) {
        alert('その食材は使われています')
        return
      }
      this.food.amount = ''
      this.food.id = food.id
      this.food.name = food.name
      this.food.unit = food.unit
      this.food.cost = food.cost
      this.$refs.foodModal.closeModal()
    },
    // 食材追加フォームの初期化
    initializeForm() {
      this.food.id = ''
      this.food.amount = ''
      this.food.name = '表示されます'
      this.food.unit = '単位'
      this.food.cost = ''
    },
    // テーブルに食材追加表示
    addFoodToRecipe() {
      if (this.food.name === '表示されます' || !this.food.amount) {
        return alert('食材と使用量を入力してください')
      }
      // 追加する食材情報
      const foodContent = {
        id: this.food.id,
        foodName: this.food.name,
        foodAmount: this.food.amount,
        foodUnit: this.food.unit,
        foodAmountCost: this.amountCost,
        foodDelBtn: 'ー'
      }
      // 入力された食材をテーブルに追加
      this.recipe.tableFoods.unshift(foodContent)

      // formの初期化
      this.initializeForm()
    },
    // テーブルから食材を削除
    deleteFood(index) {
      this.recipe.tableFoods.splice(index, 1)
    },
    // レシピ登録
    async registerRecipe() {
      // レシピ名が必須登録
      if (!this.recipe.name) {
        return alert('必須項目を入力してください')
      }
      // スピナー表示
      this.isClickBtn = true
      // 画像が選択されていればアップロードとURL取得
      if (this.selectedFile) {
        const upLoadedImageName = await this.upLoadImage(this.selectedFile) // アップロードされた画像のURLを取得
        this.recipe.image = await this.getDownloadURL(upLoadedImageName)
      }
      // レシピの原価と原価率を格納
      this.recipe.cost = this.recipeCost
      this.recipe.costRate = this.recipeCostRate
      // 食材を選んでいたらサーバーに送る為にjson型に変換
      // if文の条件を'foodContents'にしたら意図した条件分岐をしなかった
      if (this.recipe.tableFoods.length !== 0) {
        this.recipe.tableFoods.forEach((tableFood) => {
          const jsonFood = JSON.stringify(tableFood)
          this.recipe.foods.push(jsonFood)
        })
      }
      console.log(this.recipe.foods)
      // レシピを登録
      const res = await this.$store.dispatch(
        'recipe/registerRecipe',
        this.recipe
      )
      // スピナー非表示
      this.isClickBtn = false
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        this.$router.push({ path: '/signin' })
        return
      }
      // 成功すれば画面遷移
      if (res.result) {
        const recipe = res.result
        this.$router.push({ path: `/home/recipe/${recipe.id}` })
      }
    },
    // 選択されたレシピのページへ遷移
    toRecipePage(index) {
      const recipe = this.sideBarRecipes[index]
      console.log(recipe)
      this.$router.push({ path: `/home/recipe/${recipe.id}` })
    }
  }
}
</script>

<style scoped>
/* サブヘッダー */
.nav-item {
  cursor: pointer;
}

.nav-btn {
  display: block;
  margin: 0 0 0 auto;
  width: 58px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}

/* /サブヘッダー */

/* 入力フォーム */
.form-group {
  margin-bottom: 20px;
}

.require-mark {
  color: #cb2431;
}

.content_form {
  margin: 0 0 20px auto;
}

.content_form_label {
  margin-bottom: 20px;
}

.content_image {
  margin: 0 auto 20px 0;
}

.content_form {
  margin: 0 0 20px auto;
}

.content_form_input {
  margin-bottom: 20px;
}

.content_comment {
  margin: 0 auto;
}

/* /入力フォーム */

/* 食材登録フォーム */
.food-add-to-menu-form {
  margin: 0 auto 20px;
  display: flex;
}

.food-table {
  display: none;
}

.mobile-table {
  display: block;
  margin: 0 auto;
}

.mobile-table_content {
  display: flex;
  padding: 12px 6px;
  justify-content: space-between;
  background-color: #fff;
}

.mobile-table small,
.mobile-table button {
  display: block;
}

.del-btn {
  color: rgb(72, 72, 72);
  border-radius: 0.25em;
  background-color: #f1e05a;
  background-image: linear-gradient(-180deg, #f1e05a, #d8c114 90%);
}

@media screen and (min-width: 768px) {
  .food-table {
    display: table;
    margin: 0 auto 40px;
  }

  .mobile-table {
    display: none;
  }
}

/* /食材登録フォーム */

/* サイドバー */
.no-result-message {
  text-align: center;
}
</style>
