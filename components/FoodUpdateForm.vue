<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <bread-crumb>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item active"
              aria-current="page"
            >
              食材
            </li>
          </bread-crumb>
          <nav-tab
            :is-view-active="isViewActive"
            :param-id-page="`/home/food/${food.paramId}`"
            :register-page="`/home/food/register`"
          >
            <button
              slot="btn"
              type="button"
              class="btn-form_register btn btn-success btn-md"
              @click="updateFood"
            >
              <div v-show="isClickUpdateBtn" class="spinner-border text-light">
                <span class="sr-only">Loading...</span>
              </div>
              <span v-show="!isClickUpdateBtn">更新</span>
            </button>
          </nav-tab>
        </div>
        <!--  -->
        <div class="col-sm-12">
          <p>
            更新するデータを入力して下さい（<span class="requireMark">＊</span
            >は必須入力）
          </p>
        </div>
        <div class="content_form col-sm-4">
          <div class="row">
            <div class="col-sm-12">
              <span class="requireMark">＊</span>
              <strong>食材名</strong>
              <input-form
                v-model="food.name"
                placeholder="小麦粉"
                type="text"
                class="content_form_input"
              />
              <span class="requireMark">＊</span>
              <strong>仕入価格</strong>
              <input-form
                v-model="food.value"
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
              <span class="requireMark">＊</span>
              <strong>食材量</strong>
              <input-form
                v-model="food.amount"
                placeholder="100"
                type="number"
                class="content_form_input"
              >
                <div slot="input-append" class="input-group-append">
                  <select
                    id="validationCustom04"
                    v-model="food.unit"
                    class="custom-select"
                    required
                  >
                    <option selected disabled value="">単位</option>
                    <option>g</option>
                    <option>kg</option>
                    <option>ml</option>
                    <option>L</option>
                    <option>cc</option>
                  </select>
                </div>
              </input-form>
              <strong>歩留り</strong>{{ food.yield }}<span>％</span>
              <input
                id="customRange1"
                v-model="food.yield"
                type="range"
                class="custom-range"
              />
              <div class="content_form_cost">
                <strong>原価: {{ foodCost }}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="content_image col-sm-6">
          <food-image :image="food.image">
            <template slot="input-file">
              <input-file @getFileData="getFileData" />
            </template>
          </food-image>
        </div>
        <div class="content_comment col-sm-10">
          <comment-form v-model="food.comment" />
        </div>
        <!--  -->
        <div class="content_danger col-sm-10">
          <strong>食材の削除</strong>
          <div class="content_danger_form">
            <div>
              <p>
                <strong class="content_danger_form_message"
                  >現在{{
                    matchedRecipeslength
                  }}個のメニューで使用されています</strong
                >
              </p>
              <p>
                <strong class="content_danger_form_sub-message"
                  >（削除するとメニューからも削除されます）</strong
                >
              </p>
            </div>

            <button
              type="button"
              class="content_danger_form_button btn btn-md"
              @click="deleteFood"
            >
              <strong>この食材を削除</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
    <side-bar>
      <strong slot="sidebar_content">登録した食材</strong>
      <ul
        v-for="item in foods"
        slot="content-list"
        :key="item.id"
        class="list-group list-group-flush"
      >
        <li class="food-list_item list-group-item border-bottom">
          {{ item.name }}
        </li>
      </ul>
    </side-bar>
  </div>

  <!-- /content -->
</template>

<script>
import SideBar from '~/components/SideBar.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import NavTab from '~/components/home/NavTab.vue'
import FoodImage from '~/components/FoodImage.vue'
import CommentForm from '~/components/CommentForm.vue'
import inputFile from '~/components/inputFile.vue'
import InputForm from '~/components/InputForm.vue'

export default {
  components: {
    SideBar,
    BreadCrumb,
    NavTab,
    FoodImage,
    CommentForm,
    inputFile,
    InputForm
  },
  data() {
    return {
      food: {
        paramId: '',
        id: '',
        name: '',
        value: '',
        amount: '',
        yield: '',
        unit: '',
        comment: '',
        image: ''
      },
      matchedRecipeslength: '',
      selectedFile: '',
      isViewActive: true,
      isClickUpdateBtn: false
    }
  },
  computed: {
    // 全ての食材をサイドバーに表示
    foods() {
      const foods = this.$store.getters['food/foods']
      return foods
    },
    // 食材の原価
    foodCost() {
      // 計算結果が有理数(Finite)なら表示
      if (isFinite(this.food.value / this.food.amount)) {
        // 原価計算
        let cost = this.food.value / this.food.amount
        // 原価の歩留まりを計算
        cost = (cost / 100) * this.food.yield
        // 小数点第一位を基準として四捨五入
        return Math.round(cost * 10) / 10
      }
      return '表示されます'
    }
  },
  created() {
    // 使われているレシピの数
    this.matchedRecipeslength = this.$route.query.matchedRecipes
    // 受け取ったparamsを代入（更新する食材のID）
    this.food.paramId = parseInt(this.$route.params.updateFoodId)
    const foods = this.$store.getters['food/foods']
    // 一致するidのデータを取得
    const food = foods.find((food) => {
      return food.id === this.food.paramId
    })
    console.log(food)
    this.food.id = food.id
    this.food.name = food.name
    this.food.value = food.value
    this.food.amount = food.amount
    this.food.yield = food.yield
    this.food.unit = food.unit
    this.food.comment = food.comment
    this.food.image = food.image
  },
  methods: {
    // イメージ画像データを取得し、プレビューを作成
    getFileData(fileData) {
      this.selectedFile = fileData
      // ファイルを選んでなければ初期値に戻す
      if (!this.selectedFile) {
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
        this.food.image = fileData.target.result
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
    // 入力されたデータを更新
    async updateFood() {
      // 食材の名前、値段、量、単位が必須項目
      if (
        !this.food.name ||
        !this.food.value ||
        !this.food.amount ||
        !this.food.unit
      ) {
        alert('必須項目を入力してください')
        return
      }
      // スピナー表示
      this.isClickUpdateBtn = true
      // 画像が選択されていればアップロード
      if (this.selectedFile) {
        const upLoadedImageName = await this.upLoadImage(this.selectedFile)
        // アップロードされた画像のURLを取得
        this.food.image = await this.getDownloadURL(upLoadedImageName)
      }
      // 食材原価を格納
      this.food.cost = this.foodCost
      // 食材データを更新
      const res = await this.$store.dispatch('food/updateFood', this.food)
      // スピナー非表示
      this.isClickUpdateBtn = false
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        alert(res.error)
        this.$router.push({ path: '/signin' })
        return
      }
      if (res.result) {
        const food = res.result
        this.$router.push({ path: `/home/food/${food.id}` })
      }
    },
    // 食材の削除
    async deleteFood() {
      // 成功で削除された食材が格納される
      const res = await this.$store.dispatch('food/deleteFood', this.food.id)
      console.log(res)
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        alert(res.error)
        this.$router.push({ path: '/signin' })
        return
      }
      if (res.result) {
        alert(res.message)
        this.$router.push({ path: '/home/food' })
      }
    }
  }
}
</script>

<style scoped>
.content_image {
  margin: 0 auto 20px 0;
}
.content_form {
  margin: 0 0 20px auto;
}
/*  */
.content_form_cost {
  margin-bottom: 20px;
}
.content_form_input {
  margin-bottom: 20px;
}

.content_comment {
  margin: 0 auto 40px;
}
.content_danger {
  margin: 0 auto;
}
.content_danger_form {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #cb2431;
}
.content_danger_form p {
  margin-bottom: 3px;
}
.content_danger_form_sub-message {
  font-size: 14px;
}
.content_danger_form_button {
  height: 38px;
  color: #cb2431;
  background-color: #e9ecef;
  background-image: linear-gradient(-180deg, #f4f5f7, #e9ecef 90%);
}
.content_danger_form_button:hover {
  color: #fff;
  background-color: #cb2431;
  background-image: linear-gradient(-180deg, #de4450, #cb2431 90%);
}
.input-group-append select {
  margin-left: 5px;
}
.custom-select {
  padding: 2px 28px 1px 12px;
  height: 31px;
}
.btn-form {
  margin: 0 0 0 auto;
}
.btn-form_register {
  display: block;
  margin: 0 0 0 auto;
  width: 58px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}
/*  */
.spinner-border {
  width: 1.25rem;
  height: 1.25rem;
}
.requireMark {
  color: #cb2431;
}
</style>
