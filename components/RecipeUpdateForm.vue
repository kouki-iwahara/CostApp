<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_image col-sm-12">
          <food-image :image="recipe.image">
            <template slot="input-file">
              <input-file @getFileData="getFileData" />
            </template>
          </food-image>
        </div>
        <!-- /content_image -->
        <div class="content_form col-sm-12">
          <div class="row">
            <div class="col-sm-12">
              <input-form
                v-model="recipe.name"
                placeholder="カルボナーラ"
                type="text"
                class="content_form_input"
              >
                <template slot="content">
                  レシピ名
                </template>
              </input-form>
              <input-form
                v-model="recipe.value"
                placeholder="100"
                type="number"
                class="content_form_input"
              >
                <template slot="content">
                  ￥売価格
                </template>
                <div slot="input-append" class="input-group-append">
                  <span
                    id="inputGroup-sizing-lg"
                    class="input-group-text rounded-0"
                  >
                    円
                  </span>
                </div>
              </input-form>
              <food-content class="content_form_food-content">
                <template slot="content-label">
                  原価
                </template>
                <template slot="food-content">
                  {{ recipeCost }}
                </template>
              </food-content>
              <food-content class="content_form_food-content">
                <template slot="content-label">
                  原価率(％)
                </template>
                <template slot="food-content">
                  {{ recipeCostRate }}
                </template>
              </food-content>
            </div>
          </div>
        </div>
        <!-- /content_form -->
      </div>
      <!-- row -->
      <div class="row offset-3">
        <div class="plus-btn col-sm-12">
          <button
            type="button"
            class="btn btn-success rounded-circle p-0"
            style="width:2rem;height:2rem;"
          >
            ＋
          </button>
          <span>食材を登録</span>
          <nuxt-link to="/addFoodToRecipePage" class="nav-link">
            ボタン押下でここに遷移する
          </nuxt-link>
        </div>
        <div class="food-add-to-menu-form col-sm-12">
          <add-food-form
            v-model="food.amount"
            :food-name="food.name"
            :food-cost="amountCost"
            :food-unit="food.unit"
            @addFoodToRecipe="addFoodToRecipe"
            @initializeForm="initializeForm"
          />
        </div>
        <div class="col-sm-12">
          <recipe-register-table
            :recipe-table-foods="recipe.tableFoods"
            @deleteFood="deleteFood"
          />
        </div>
        <div class="col-sm-12">
          <comment-form v-model="recipe.comment" />
        </div>
        <div class="btn-form col-sm-6">
          <button
            type="button"
            class="btn btn-info btn-block btn-lg"
            @click="updateRecipe"
          >
            修正
          </button>
        </div>
        <div class="btn-form col-sm-6">
          <button
            type="button"
            class="btn btn-danger btn-block btn-lg"
            @click="deleteRecipe"
          >
            削除
          </button>
        </div>
      </div>
    </div>
    <side-bar>
      <ul
        v-for="item in foods"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
      >
        <li
          class="food-list_item list-group-item border-bottom border-info"
          @click="selectFood($store.getters['food/foods'].indexOf(item))"
        >
          {{ item.name }}
        </li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
import FoodImage from '~/components/FoodImage.vue'
import FoodContent from '~/components/FoodContent.vue'
import AddFoodForm from '~/components/AddFoodForm.vue'
import RecipeRegisterTable from '~/components/RecipeRegisterTable.vue'
import CommentForm from '~/components/CommentForm.vue'
import inputFile from '~/components/inputFile.vue'
import InputForm from '~/components/InputForm.vue'
import SideBar from '~/components/SideBar.vue'

export default {
  components: {
    FoodImage,
    FoodContent,
    CommentForm,
    AddFoodForm,
    RecipeRegisterTable,
    inputFile,
    InputForm,
    SideBar
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
      selectedFile: ''
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
    // 全ての食材
    foods() {
      return this.$store.getters['food/foods']
    },
    // 食材の使用量に対しての原価
    amountCost() {
      if (!this.food.amount) {
        return '表示されます'
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
    // 食材テーブルに取り消しボタンを格納
    recipe.foods.forEach((food) => {
      food.foodDelBtn = 'ー'
      this.recipe.tableFoods.push(food)
    })
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
      this.recipe.tableFoods.push(foodContent)
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
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        alert(res.error)
        this.$router.push({ path: '/signin' })
        return
      }
      alert(res.message)
      // 成功すれば画面遷移
      if (res.result) {
        this.$router.push({ path: '/recipe/recipeCheckPage' })
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
      alert(res.message)
      // 成功すれば画面遷移
      if (res.result) {
        this.$router.push({ path: '/recipe/recipeCheckPage' })
      }
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
  display: none;
}
.content_form .input-group {
  padding-bottom: 20px;
}

.btn-form {
  margin: 0 auto;
}

.plus-btn {
  display: block;
  margin: 20px 0;
}
@media screen and (min-width: 768px) {
  /* 謎の空白があり、offset-3のmarginを調節した */
  .plus-btn {
    display: none;
  }
  .food-add-to-menu-form {
    margin-bottom: 20px;
    display: flex;
  }
}
</style>
