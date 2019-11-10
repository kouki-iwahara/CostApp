<template>
  <div>
    <div class="content container-fluid">
      <div class="row offset-3">
        <!-- パンくずリストとナビタブ -->
        <div class="content_header col-sm-12">
          <sub-header :is-register-active="isRegisterActive">
            <register-btn
              slot="btn"
              :is-click-btn="isClickBtn"
              @registerFood="registerFood"
            />
          </sub-header>
        </div>

        <!-- 登録メッセージ -->
        <div class="col-sm-12">
          <paragraph-text>
            食材データを入力して下さい。（<span class="require-mark">＊</span
            >は必須入力）
          </paragraph-text>
        </div>

        <!-- 食材データ入力フォーム -->
        <div class="content_form col-sm-4">
          <div class="row">
            <div class="col-sm-12">
              <!-- 食材名 -->
              <text-box-with-label
                v-model="food.name"
                require-mark="＊"
                label-name="食材名"
                placeholder="食材名を入力"
                class="content_form_input"
              />
              <!-- 仕入れ価格 -->
              <number-box-with-label
                v-model="food.value"
                require-mark="＊"
                label-name="仕入価格"
                placeholder="仕入価格を入力"
                :is-food-value="true"
                class="content_form_input"
              >
                <span-text
                  id="inputGroup-sizing-sm"
                  slot="input-append"
                  class="input-group-text rounded-0"
                >
                  円
                </span-text>
              </number-box-with-label>
              <!-- 食材量 -->
              <number-box-with-label
                v-model="food.amount"
                require-mark="＊"
                label-name="食材量"
                placeholder="食材量を入力"
                :is-food-amount="true"
                class="content_form_input"
              >
                <unit-select-box
                  slot="input-append"
                  v-model="food.unit"
                  class="custom-select"
                />
              </number-box-with-label>
              <!-- 歩留まり -->
              <range-with-label
                v-model="food.yield"
                label-name="歩留り"
                :food-yield="food.yield"
                class="content_form_input"
              />
              <!-- 原価の計算の結果 -->
              <div class="content_form_label">
                <strong-text> 原価: {{ foodCost }} </strong-text>
              </div>
            </div>
          </div>
        </div>

        <!-- 画像 -->
        <div class="content_image col-sm-6">
          <image-with-input-file
            :image="food.image"
            @getFileData="getFileData"
          />
        </div>

        <!-- コメント -->
        <div class="content_comment col-sm-10">
          <text-area-with-label v-model="food.comment" />
        </div>
      </div>
      <!-- row -->
    </div>
    <!-- container-fluid -->

    <!-- サイドバー -->
    <side-bar
      v-model="searchText"
      placeholder="食材名を検索"
      :items="sideBarfoods"
      @toFoodPage="toFoodPage"
    />
  </div>
</template>

<script>
import SubHeader from '~/components/organisms/SubHeader/SubHeader'
import RegisterBtn from '~/components/molecules/btn/RegisterBtn'
import ParagraphText from '~/components/atoms/Text/ParagraphText'
import TextBoxWithLabel from '~/components/molecules/TextBoxWithLabel'
import NumberBoxWithLabel from '~/components/molecules/NumberBoxWithLabel'
import SpanText from '~/components/atoms/Text/SpanText'
import UnitSelectBox from '~/components/atoms/SelectBox/UnitSelectBox'
import RangeWithLabel from '~/components/molecules/RangeWithLabel'
import StrongText from '~/components/atoms/Text/StrongText'
import ImageWithInputFile from '~/components/molecules/image/ImageWithInputFile'
import TextAreaWithLabel from '~/components/molecules/TextArea/TextAreaWithLabel'
import SideBar from '~/components/organisms/SideBar/SideBar'

export default {
  components: {
    SubHeader,
    RegisterBtn,
    ParagraphText,
    SpanText,
    UnitSelectBox,
    TextBoxWithLabel,
    NumberBoxWithLabel,
    RangeWithLabel,
    StrongText,
    ImageWithInputFile,
    TextAreaWithLabel,
    SideBar
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
      isClickBtn: false
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
  methods: {
    // サイドバーから選択された食材ページへ遷移
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
      this.isClickBtn = true
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
      this.isClickBtn = false
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
  margin-bottom: 18px;
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

/* サイドバー */
.no-result-message {
  text-align: center;
}
/* /サイドバー */
</style>
