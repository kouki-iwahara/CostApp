<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <sub-header
            list-name="食材"
            :is-values="$store.getters['food/foods']"
            :is-view-active="isViewActive"
            :param-id-page="`/home/food/${food.paramId}`"
            :register-page="`/home/food/register`"
          >
            <update-btn
              slot="btn"
              class="content_header_btn"
              :is-click-btn="isClickBtn"
              @updateFood="updateFood"
            />
          </sub-header>
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
                placeholder="食材名を入力"
                type="text"
                class="content_form_input"
              />
              <span class="requireMark">＊</span>
              <strong>仕入価格</strong>
              <input-form
                v-model="food.value"
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
              <span class="requireMark">＊</span>
              <strong>食材量と単位</strong>
              <input-form
                v-model="food.amount"
                placeholder="数値を入力"
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
      <div slot="sidebar_search">
        <search-bar v-model="searchText" placeholder="食材名を検索" />
      </div>
      <strong slot="sidebar_content">登録した食材</strong>
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

  <!-- /content -->
</template>

<script>
import SubHeader from '~/components/organisms/SubHeader/SubHeader'
import UpdateBtn from '~/components/molecules/Btn/UpdateBtn'
import SideBar from '~/components/SideBar.vue'
import searchBar from '~/components/common/searchBar.vue'
// import BreadCrumb from '~/components/BreadCrumb.vue'
// import NavTab from '~/components/home/NavTab.vue'
import FoodImage from '~/components/FoodImage.vue'
import InputFile from '~/components/InputFile.vue'
import CommentForm from '~/components/CommentForm.vue'
import InputForm from '~/components/InputForm.vue'

export default {
  components: {
    SubHeader,
    UpdateBtn,
    SideBar,
    searchBar,
    // BreadCrumb,
    // NavTab,
    FoodImage,
    CommentForm,
    InputFile,
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
      searchText: '',
      selectedFile: '',
      isViewActive: true,
      isClickBtn: false
    }
  },
  computed: {
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
    console.log(this.$route.query.matchedRecipes)
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
      this.isClickBtn = true
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
      this.isClickBtn = false
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
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
        this.$router.push({ path: '/signin' })
        return
      }
      if (res.result) {
        this.$router.push({ path: '/home/food' })
      }
    },
    toFoodPage(index) {
      const food = this.sideBarfoods[index]
      console.log(food)
      this.$router.push({ path: `/home/food/${food.id}` })
    }
  }
}
</script>

<style scoped>
.content_header_btn {
  margin: 0 0 0 auto;
}

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
  text-align: center;
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
/* サイドバー */
.no-result-message {
  text-align: center;
}

@media screen and (min-width: 500px) {
  .content_danger_form {
    display: flex;
    justify-content: space-between;
  }
}
</style>
