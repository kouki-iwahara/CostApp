<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <div class="content_image col-sm-12">
          <food-image :image="food.image">
            <template slot="input-file">
              <input-file @getFileData="getFileData" />
            </template>
          </food-image>
        </div>
        <div class="content_form col-sm-12">
          <input-form
            v-model="food.name"
            placeholder="小麦粉"
            type="text"
            class="content_form_input"
          >
            <template slot="content">
              食材名
            </template>
          </input-form>
          <input-form
            v-model="food.value"
            placeholder="100"
            type="number"
            class="content_form_input"
          >
            <template slot="content">
              ￥価格
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
                style="height: 48px;"
                class="custom-select"
                required
              >
                <option selected disabled value="">単位</option>
                <option>g</option>
                <option>ml</option>
              </select>
            </div>
            <template slot="content">
              食材量
            </template>
          </input-form>
          <label for="customRange1"
            >歩留まり{{ food.yield }}<span>％</span></label
          >
          <input
            id="customRange1"
            v-model="food.yield"
            type="range"
            class="custom-range"
          />
          <food-content>
            <template slot="content-label">
              原価
            </template>
            <template slot="food-content">
              {{ foodCost }}
            </template>
          </food-content>
        </div>
        <div class="col-sm-12">
          <comment-form v-model="food.comment" />
        </div>
      </div>
      <div class="btn-form row offset-3">
        <div class="col-sm-6">
          <button
            type="button"
            class="btn btn-info btn-block btn-lg"
            @click="updateFood"
          >
            更新
          </button>
        </div>
        <div class="col-sm-6">
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
        <li class="food-list_item list-group-item border-bottom border-info">
          {{ item.name }}
        </li>
      </ul>
    </side-bar>
  </div>

  <!-- /content -->
</template>

<script>
import SideBar from '~/components/SideBar.vue'
import FoodImage from '~/components/FoodImage.vue'
import CommentForm from '~/components/CommentForm.vue'
import FoodContent from '~/components/FoodContent.vue'
import inputFile from '~/components/inputFile.vue'
import InputForm from '~/components/InputForm.vue'

export default {
  components: {
    SideBar,
    FoodImage,
    CommentForm,
    FoodContent,
    inputFile,
    InputForm
  },
  data() {
    const index = this.$route.params.foodId
    const food = this.$store.getters['food/foods'][index]
    return {
      food: {
        id: food.id,
        name: food.name,
        value: food.value,
        amount: food.amount,
        yield: food.yield,
        unit: food.unit,
        comment: food.comment,
        image: food.image
      },
      selectedFile: ''
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
    // 入力されたデータを登録
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
      // 画像が選択されていればアップロード
      if (this.selectedFile) {
        const upLoadedImageName = await this.upLoadImage(this.selectedFile)
        // アップロードされた画像のURLを取得
        this.food.image = await this.getDownloadURL(upLoadedImageName)
      }
      // 食材原価を格納
      this.food.cost = this.foodCost
      // 食材データを登録
      const res = await this.$store.dispatch('food/updateFood', this.food)
      console.log(res.message)
      alert(res.message)
      if (res.result) {
        this.$router.push({ path: '/' })
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
.content_form_input {
  margin-bottom: 15px;
}
[name='amount'] {
  margin-left: 5px;
}

.persent {
  border: none;
  border-bottom: 1px solid;
}

.comment-form {
  margin: 20px 0;
}
.input-group-append select {
  margin-left: 5px;
}
</style>
