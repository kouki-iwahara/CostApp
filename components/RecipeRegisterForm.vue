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
          <recipe-table @deleteFood="deleteFood" />
        </div>
        <div class="col-sm-12">
          <comment-form v-model="recipe.comment" />
        </div>
        <div class="btn-form col-sm-6">
          <button
            type="button"
            class="btn btn-info btn-block btn-lg"
            @click="registerRecipe"
          >
            登録
          </button>
        </div>
        <div class="btn-form col-sm-6">
          <button type="button" class="btn btn-danger btn-block btn-lg">
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
import RecipeTable from '~/components/RecipeTable.vue'
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
    RecipeTable,
    inputFile,
    InputForm,
    SideBar
  },
  data() {
    return {
      recipe: {
        name: '',
        value: '',
        comment: '',
        image: require('~/assets/pasta.jpg')
      },
      food: {
        id: '',
        userId: '',
        name: '表示されます',
        amount: '',
        unit: 'g',
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
      const foodContents = this.$store.getters['recipe/foodContents']
      foodContents.forEach((content) => {
        cost += parseFloat(content.amountCost)
      })
      return cost
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
      const foodContents = this.$store.getters['recipe/foodContents']
      // 食材の重複禁止の為、idが重複しているか調べる
      const overlapId = foodContents.find((foodContent) => {
        return foodContent.id === food.id
      })
      // idが重複していた場合
      if (overlapId) {
        alert('その食材は使われています')
        return
      }
      this.food.amount = ''
      this.food.userId = food.userId
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
      this.food.unit = 'g'
      this.food.cost = ''
    },
    // レシピに食材追加
    addFoodToRecipe() {
      if (this.food.name === '表示されます' || !this.food.amount) {
        return alert('食材と使用量を入力してください')
      }
      // 追加する食材情報
      const foodContent = {
        id: this.food.id,
        userId: this.food.userId,
        name: this.food.name,
        amount: this.food.amount,
        unit: this.food.unit,
        amountCost: this.amountCost,
        delBtn: 'ー'
      }
      // 入力された食材をテーブルに追加
      this.$store.dispatch('recipe/addFoodToRecipe', foodContent)
      // formの初期化
      this.initializeForm()
    },
    // テーブルから食材を削除
    deleteFood(index) {
      this.$store.dispatch('recipe/deleteFood', index)
    },
    // レシピ登録
    async registerRecipe() {
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
      // レシピを登録
      console.log(this.recipe)
      this.$store.dispatch('recipe/registerRecipe', this.recipe)
      console.log(this.$store.state.recipe.recipes)
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
