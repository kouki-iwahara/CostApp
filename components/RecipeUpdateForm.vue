<template>
  <div>
    <div class="content container-fluid">
      <!-- サブヘッダー始まり -->
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <!-- パンくずリスト -->
          <bread-crumb>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item active"
              aria-current="page"
            >
              レシピ
            </li>
          </bread-crumb>
          <!-- ページナビ -->
          <nav-tab
            :is-view-active="isViewActive"
            :param-id-page="`/home/recipe/${recipe.id}`"
            :register-page="`/home/recipe/register`"
          >
            <button
              slot="btn"
              type="button"
              class="nav-btn btn btn-success btn-md"
              @click="updateRecipe"
            >
              <!-- スピナー -->
              <div v-show="isClickUpdateBtn" class="spinner-border text-light">
                <span class="sr-only">Loading...</span>
              </div>
              <span v-show="!isClickUpdateBtn">更新</span>
            </button>
          </nav-tab>
        </div>
      </div>
      <!-- サブヘッダー終わり -->

      <!-- 入力フォーム始まり -->
      <div class="form-group row  offset-3">
        <div class="col-sm-12">
          <p>
            更新するデータを入力して下さい。（<span class="require-mark"
              >＊</span
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
                placeholder="カルボナーラ"
                type="text"
                class="content_form_input"
              />
              <!-- 売価格 -->
              <strong>売価格<small>(公開されません)</small></strong>
              <input-form
                v-model="recipe.value"
                placeholder="100"
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
                <strong>原価： {{ recipeCost }}</strong>
              </div>
              <!-- 原価率 -->
              <div class="content_form_label">
                <strong>原価率: {{ recipeCostRate }}</strong>
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
        <!--食材登録の＋ボタン min-width: 768pxまで非表示 -->
        <div class="plus-btn col-sm-12">
          <button
            type="button"
            class="btn btn-success rounded-circle p-0"
            style="width:1.5rem;height:1.5rem;"
            @click="toAddFoodPage"
          >
            ＋
          </button>
          <span>食材を追加</span>
        </div>
        <!-- 食材登録フォーム min-width: 768pxまで表示 -->
        <div class="food-add-to-menu-form col-sm-10">
          <add-food-form
            v-model="food.amount"
            :food-name="food.name"
            :food-cost="amountCost"
            :food-unit="food.unit"
            @addFoodToRecipe="addFoodToRecipe"
            @initializeForm="initializeForm"
          />
        </div>
        <!-- 食材テーブル -->
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

              <small
                >{{ tableFood.foodAmountCost }}/{{ tableFood.foodUnit }}</small
              >
            </div>
            <div>
              <strong
                >{{ tableFood.foodAmount }}{{ tableFood.foodUnit }}</strong
              >
              <button
                type="button"
                class="del-btn btn btn-warning rounded-circle p-0"
                style="width:1.5rem;height:1.5rem;"
                @click="deleteFood(recipe.tableFoods.indexOf(tableFood))"
              >
                {{ tableFood.foodDelBtn }}
              </button>
            </div>
          </div>
        </div>
        <!-- 削除フォーム -->
        <div class="content_danger col-sm-10">
          <strong>レシピの削除</strong>
          <div class="content_danger_form">
            <div>
              <p>
                <strong>削除すると食材からもレシピが削除されます</strong>
              </p>
            </div>
            <button
              type="button"
              class="content_danger_btn btn btn-md"
              @click="deleteRecipe"
            >
              <strong>このレシピを削除</strong>
            </button>
          </div>
        </div>
        <!-- 削除フォーム終わり -->
      </div>
    </div>
    <!-- /content -->
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
      >
        <li
          class="food-list_item list-group-item border-bottom"
          @click="selectFood(sideBarfoods.indexOf(item))"
        >
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
import BreadCrumb from '~/components/BreadCrumb.vue'
import NavTab from '~/components/home/NavTab.vue'
import FoodImage from '~/components/FoodImage.vue'
import AddFoodForm from '~/components/AddFoodForm.vue'
import RecipeRegisterTable from '~/components/RecipeRegisterTable.vue'
import CommentForm from '~/components/CommentForm.vue'
import inputFile from '~/components/inputFile.vue'
import InputForm from '~/components/InputForm.vue'
import SideBar from '~/components/SideBar.vue'
import searchBar from '~/components/common/searchBar.vue'

export default {
  components: {
    BreadCrumb,
    NavTab,
    FoodImage,
    CommentForm,
    AddFoodForm,
    RecipeRegisterTable,
    inputFile,
    InputForm,
    SideBar,
    searchBar
  },
  data() {
    return {
      recipe: {
        id: '',
        name: '',
        value: '',
        comment: '',
        // 食材データのテーブル
        tableFoods: [],
        // 食材テーブルのデータをjson形式にして格納する為の配列
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
      isViewActive: true,
      isClickUpdateBtn: false
    }
  },
  computed: {
    // レシピの原価率
    recipeCostRate() {
      const costRate = (this.recipeCost / this.recipe.value) * 100
      if (isFinite(costRate)) {
        return Math.round(costRate * 10) / 10
      }
      return '表示されます'
    },
    // サイドバーの食材（検索バーとレンダリングしている）
    sideBarfoods() {
      const filterFoods = []
      const foods = this.$store.getters['food/foods'].slice()
      // 検索バーにテキストが無ければ全ての食材を表示
      if (!this.searchText) {
        return foods
      }
      // 検索バーに入力されたテキストを含む食材を表示
      foods.forEach((food) => {
        if (food.name.includes(this.searchText)) {
          filterFoods.push(food)
        }
      })
      return filterFoods
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
      // const foodContents = this.$store.getters['recipe/foodContents']
      this.recipe.tableFoods.forEach((tableFood) => {
        cost += parseFloat(tableFood.foodAmountCost)
      })
      return Math.round(cost * 10) / 10
    }
  },
  created() {
    this.recipe.id = parseInt(this.$route.params.recipeId)
    const recipes = this.$store.getters['recipe/recipes']
    // 受け取ったidと一致するレシピを取得
    const recipe = recipes.find((recipe) => {
      return recipe.id === this.recipe.id
    })
    console.log(recipe)
    // 取得したデータを代入
    this.recipe.name = recipe.name
    this.recipe.value = recipe.value
    this.recipe.comment = recipe.comment
    this.recipe.image = recipe.image
    // 食材を選んでいない場合、登録されている初期の食材データをテーブルに表示（食材を選んでいればthis.addFoodToMobileForm()で食材がテーブルに表示される）
    if (!this.$route.query.tableFoods)
      // 食材テーブルにレシピに登録されている食材を表示
      recipe.foods.forEach((food) => {
        food.foodDelBtn = 'ー'
        this.recipe.tableFoods.push(food)
      })
    // 追加する食材データがクエリに格納されていればフォームに食材を表示
    if (this.$route.query.recipeFood) {
      this.addFoodToMobileForm()
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
    selectFood(index) {
      const food = this.$store.getters['food/foods'][index]
      // 食材の重複禁止の為、idが重複しているか調べる
      const overlapId = this.recipe.tableFoods.find((tableFood) => {
        return tableFood.foodId === food.id
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
    },
    // スマホ画面の食材追加フォームの表示
    addFoodToMobileForm() {
      // 追加する食材データが無ければ返す
      if (!this.$route.query.recipeFood.id) {
        return
      }
      // フォームに表示
      const food = this.$route.query.recipeFood
      this.food.amount = ''
      this.food.id = food.id
      this.food.name = food.name
      this.food.unit = food.unit
      this.food.cost = food.cost
      // 食材テーブルのクエリが無い場合（スマホの画面スライドにより無くなる場合有り）
      if (!this.$route.query.tableFoods) {
        return
      }
      const tableFoods = this.$route.query.tableFoods.slice()
      // 食材テーブルの配列に食材が追加されていればテーブルに表示する
      if (tableFoods.length !== 0) {
        console.log('query.tableFoods', tableFoods)
        // 画面横スライドで、データはあるが読み取れなくなるのでidの所持で分岐した
        if (tableFoods[0].foodId) {
          this.$route.query.tableFoods.forEach((food) => {
            console.log(food)
            this.recipe.tableFoods.push(food)
          })
        }
      }
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
        foodId: this.food.id,
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
    async updateRecipe() {
      // レシピ名が必須登録
      if (!this.recipe.name) {
        return alert('必須項目を入力してください')
      }
      // スピナー表示
      this.isClickUpdateBtn = true
      // 画像が選択されていればアップロードとURL取得
      if (this.selectedFile) {
        const upLoadedImageName = await this.upLoadImage(this.selectedFile) // アップロードされた画像のURLを取得
        this.recipe.image = await this.getDownloadURL(upLoadedImageName)
      }
      // レシピの原価と原価率を格納
      this.recipe.cost = this.recipeCost
      this.recipe.costRate = this.recipeCostRate
      // 食材を選んでいたらサーバーに送る為にjson型に変換
      // if文の条件を'!this.recipe.tableFoods'にしたら意図した条件分岐をしなかった
      console.log(this.recipe.tableFoods)
      if (this.recipe.tableFoods.length !== 0) {
        this.recipe.tableFoods.forEach((tableFood) => {
          const jsonFood = JSON.stringify(tableFood)
          this.recipe.foods.push(jsonFood)
        })
      }
      console.log(this.recipe)
      // レシピを更新
      const res = await this.$store.dispatch('recipe/updateRecipe', this.recipe)
      console.log(res)
      // スピナー非表示
      this.isClickUpdateBtn = false
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        alert(res.error)
        this.$router.push({ path: '/signin' })
        return
      }
      // 成功すれば画面遷移
      if (res.result) {
        this.$router.push({ path: `/home/recipe/${this.recipe.id}` })
      }
    },
    // レシピを削除
    async deleteRecipe() {
      // 成功で削除されたレシピが格納される
      const res = await this.$store.dispatch(
        'recipe/deleteRecipe',
        this.recipe.id
      )
      console.log(res)
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        alert(res.error)
        this.$router.push({ path: '/signin' })
        return
      }
      // 成功すれば画面遷移
      if (res.result) {
        alert(res.message)
        this.$router.push({ path: '/home/recipe' })
      }
    },
    // スマホ画面の食材追加ページへ遷移
    toAddFoodPage() {
      this.$router.push({
        path: '/home/recipe/register/addFood',
        query: {
          tableFoods: this.recipe.tableFoods,
          isUpdateId: this.$route.params.recipeId
        }
      })
    }
  }
}
</script>

<style scoped>
/* サブヘッダー */
/* 登録ボタン */
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
/* .food-add-to-menu-form {
  display: none;
} */

.plus-btn {
  display: block;
  margin: 20px 0;
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
@media screen and (min-width: 768px) {
  .plus-btn {
    display: none;
  }
  .food-add-to-menu-form {
    margin: 0 auto 20px;
    display: flex;
  }

  .food-table {
    display: table;
    margin: 0 auto 40px;
  }

  .mobile-food-table {
    display: none;
  }
}

/* /食材登録フォーム */

/* 削除フォーム */
.content_danger {
  margin: 20px auto 20px;
}
.content_danger_form {
  text-align: center;
  padding: 16px;
  border: 1px solid #cb2431;
}
.content_danger_form p {
  font-size: 14px;
  margin-bottom: 3px;
}

.content_danger_btn {
  height: 38px;
  color: #cb2431;
  background-color: #e9ecef;
  background-image: linear-gradient(-180deg, #f4f5f7, #e9ecef 90%);
}
.content_danger_btn:hover {
  color: #fff;
  background-color: #cb2431;
  background-image: linear-gradient(-180deg, #de4450, #cb2431 90%);
}

/* /削除フォーム */

/* サイドバー */
.no-result-message {
  text-align: center;
}

/* /サイドバー */

@media screen and (min-width: 830px) {
  /* 削除ボタンフォーム */
  .content_danger_form {
    display: flex;
    justify-content: space-between;
  }
}
</style>
