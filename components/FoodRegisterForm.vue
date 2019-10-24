<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_header col-sm-12">
          <bread-crumb>
            <li slot="breadcrumb-item" class="breadcrumb-item">
              <nuxt-link to="/home/food" class="nav-link">
                マイページ
              </nuxt-link>
            </li>
            <li slot="breadcrumb-item" class="breadcrumb-item">
              <nuxt-link to="/home/food" class="nav-link">
                食材
              </nuxt-link>
            </li>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item active"
              aria-current="page"
            >
              登録
            </li>
          </bread-crumb>
          <nav-tab
            :is-register-active="isRegisterActive"
            :param-id-page="`/home/food/${food.paramId}`"
            :register-page="`/home/food/register`"
          >
            <div slot="btn-form" class="btn-form">
              <button
                type="button"
                class="btn-form_update btn btn-warning btn-md"
                @click="registerFood"
              >
                登録
              </button>
            </div>
          </nav-tab>
        </div>
        <!-- content_header -->
        <div class="content_image col-sm-6">
          <food-image :image="food.image">
            <template slot="input-file">
              <input-file @getFileData="getFileData" />
            </template>
          </food-image>
        </div>

        <div class="content_form col-sm-8">
          <strong>食材名</strong>
          <input-form
            v-model="food.name"
            placeholder="小麦粉"
            type="text"
            class="content_form_input"
          />
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
          <div>
            <strong>原価: {{ foodCost }}</strong>
          </div>
        </div>
        <div class="content_comment col-sm-8">
          <comment-form v-model="food.comment" />
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
        <li class="food-list_item list-group-item border-bottom border-info">
          {{ item.name }}
        </li>
      </ul>
    </side-bar>
  </div>
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
        name: '',
        value: '',
        amount: '',
        yield: 100,
        unit: '',
        comment: '',
        image: require('~/assets/pasta.jpg')
      },
      selectedFile: '',
      isRegisterActive: true
    }
  },
  computed: {
    foods() {
      return this.$store.getters['food/foods']
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
    this.food.paramId = this.foods[0].id
    console.log(this.food.paramId)
  },
  methods: {
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
      // ユーザー認証が切れていたらsigninに遷移
      if (res.error) {
        alert(res.error)
        this.$router.push({ path: '/signin' })
        return
      }
      alert(res.message)
      if (res.result) {
        this.$router.push({ path: '/home/food' })
      }
    }
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
.content_header {
  background-color: #f4f5f7;
  padding: 0;
  margin-bottom: 20px;
}
.content_image {
  margin: 0 auto 20px;
}
/*  */
.content_form {
  margin: 0 auto 20px;
}
.content_form_input {
  margin-bottom: 20px;
}

/*  */

[name='amount'] {
  margin-left: 5px;
}
.content_comment {
  margin: 0 auto 30px;
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
.btn-form_update {
  margin-right: 15px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  border-color: #ffc107;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
}
</style>
