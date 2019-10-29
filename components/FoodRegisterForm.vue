<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <!-- サブヘッダー始まり -->
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
            :is-register-active="isRegisterActive"
            :param-id-page="`/home/food/${food.paramId}`"
            :register-page="`/home/food/register`"
          >
            <nuxt-link
              v-show="$store.getters['food/foods'].length"
              slot="nav-item"
              :to="`/home/food/${food.paramId}`"
              class="nav-item nav-link"
            >
              表示
            </nuxt-link>
            <div
              v-show="!$store.getters['food/foods'].length"
              slot="nav-item"
              class="nav-item nav-link"
              @click="showAlert"
            >
              表示
            </div>
            <button
              slot="btn"
              type="button"
              class="nav-btn btn btn-success btn-md"
              @click="registerFood"
            >
              <div
                v-show="isClickRegisterBtn"
                class="spinner-border text-light"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <span v-show="!isClickRegisterBtn">登録</span>
            </button>
          </nav-tab>
        </div>
        <!-- サブヘッダー終わり -->
        <div class="col-sm-12">
          <p>
            食材データを入力して下さい。（<span class="require-mark">＊</span
            >は必須入力）
          </p>
        </div>
        <div class="content_form col-sm-4">
          <div class="row">
            <div class="col-sm-12">
              <!-- 食材名 -->
              <span class="require-mark">＊</span>
              <strong>食材名</strong>
              <input-form
                v-model="food.name"
                placeholder="小麦粉"
                type="text"
                class="content_form_input"
              />
              <!-- 仕入れ価格 -->
              <span class="require-mark">＊</span>
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
              <!-- 食材量 -->
              <span class="require-mark">＊</span>
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
              <div class="content_form_label">
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
      </div>
    </div>
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
        @click="toFoodPage(sideBarfoods.indexOf(item))"
      >
        <li class="food-list_item list-group-item border-bottom">
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
import SideBar from '~/components/SideBar.vue'
import searchBar from '~/components/common/searchBar.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'
import NavTab from '~/components/home/NavTab.vue'
import FoodImage from '~/components/FoodImage.vue'
import CommentForm from '~/components/CommentForm.vue'
import inputFile from '~/components/inputFile.vue'
import InputForm from '~/components/InputForm.vue'

export default {
  components: {
    SideBar,
    searchBar,
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
        name: '',
        value: '',
        amount: '',
        yield: 100,
        unit: '',
        comment: '',
        image: require('~/assets/pasta.jpg')
      },
      selectedFile: '',
      searchText: '',
      isRegisterActive: true,
      isClickRegisterBtn: false
    }
  },
  computed: {
    sideBarfoods() {
      const filterFoods = []
      const foods = this.$store.getters['food/foods'].slice()
      if (!this.searchText) {
        return foods
      }
      foods.forEach((food) => {
        if (food.name.includes(this.searchText)) {
          filterFoods.push(food)
        }
      })
      return filterFoods
    },
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
    if (this.sideBarfoods.length !== 0) {
      this.food.paramId = this.sideBarfoods[0].id
    }
    console.log(this.food.paramId)
  },
  methods: {
    showAlert() {
      alert('食材が登録されていません')
    },
    toFoodPage(index) {
      const food = this.sideBarfoods[index]
      console.log(food)
      this.$router.push({ path: `/home/food/${food.id}` })
    },
    // イメージ画像データを取得し、プレビューを作成
    getFileData(fileData) {
      this.selectedFile = fileData
      // ファイルを選んでなければ初期値に戻す
      if (!this.selectedFile) {
        this.food.image = require('~/assets/pasta.jpg')
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
    // 入力されたデータを登録
    async registerFood() {
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
      this.isClickRegisterBtn = true
      // 画像が選択されていればアップロード
      if (this.selectedFile) {
        const upLoadedImageName = await this.upLoadImage(this.selectedFile)
        // アップロードされた画像のURLを取得
        this.food.image = await this.getDownloadURL(upLoadedImageName)
      }
      // 食材原価を格納
      this.food.cost = this.foodCost
      // 食材データを登録
      const res = await this.$store.dispatch('food/registerFood', this.food)
      console.log(res)
      // スピナー非表示
      this.isClickRegisterBtn = false
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        alert(res.error)
        this.$router.push({ path: '/signin' })
        return
      }
      console.log(res.result)
      // 登録成功で表示ページへ遷移
      if (res.result) {
        const food = res.result
        this.$router.push({ path: `/home/food/${food.id}` })
      }
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
.content_image {
  margin: 0 auto 20px 0;
}
.content_form {
  margin: 0 0 20px auto;
}
.content_form_label {
  margin-bottom: 20px;
}
.content_form_input {
  margin-bottom: 20px;
}

.content_comment {
  margin: 0 auto;
}

.input-group-append select {
  margin-left: 5px;
}
.custom-select {
  padding: 2px 28px 1px 12px;
  height: 31px;
}

/*  */
.spinner-border {
  width: 1.25rem;
  height: 1.25rem;
}
.require-mark {
  color: #cb2431;
}
/* サイドバー */
.no-result-message {
  text-align: center;
}
/* /サイドバー */
</style>
