<template>
  <div class="row">
    <div class="register-info col-sm-12 border-bottom border-gray text-danger">
      <small>＊サイドバーから食材をクリック</small>
    </div>

    <div class="food-content col-sm-3">
      <span>食材名</span>
      <strong>{{ foodName }}</strong>
    </div>
    <div class="food-content col-sm-3">
      <div class="food-content_amount">
        <span>使用量</span>
      </div>
      <div class="input-group input-group-lg">
        <input
          type="number"
          :value="value"
          class="form-control rounded-0"
          placeholder="使用量"
          min="0"
          aria-describedby="inputGroup-sizing-lg"
          @input="updateValue"
        />
        <div class="input-group-prepend">
          <span id="inputGroup-sizing-lg" class="input-group-text rounded-0">
            {{ foodUnit }}
          </span>
        </div>
      </div>
    </div>
    <div class="food-content col-sm-3">
      <span>原価</span>
      <strong>{{ foodCost }}</strong>
    </div>
    <div class="add-btn col-sm-3">
      <div class="row">
        <div class="col-sm-12">
          <button
            type="button"
            class="btn btn-outline-success btn-block btn-sm"
            @click="addFoodToRecipe"
          >
            追加
          </button>
        </div>
        <div class="col-sm-12">
          <button
            type="button"
            class="btn btn-outline-warning btn-block btn-sm"
            @click="initializeForm"
          >
            やめる
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    foodName: {
      type: String,
      required: true
    },
    foodCost: {
      type: [Number, String],
      required: true
    },
    foodUnit: {
      type: String,
      required: true
    }
  },
  methods: {
    // input入力値の更新
    updateValue(e) {
      console.log(e.target)
      this.$emit('input', e.target.value)
    },
    // 入力された食材をテーブルに追加する
    addFoodToRecipe() {
      this.$emit('addFoodToRecipe')
    },
    // 入力フォームの初期化
    initializeForm() {
      this.$emit('initializeForm')
    }
  }
}
</script>

<style scoped>
.register-info {
  margin-top: 20px;
  margin-bottom: 20px;
}
.food-content {
  position: relative;
}
.food-content strong {
  display: block;
  font-size: 1.25em;
  border-bottom: 1px darkslategray solid;
  /* color: #a8aeb5e9; */
  opacity: 0.8;
  position: absolute;
  bottom: 0;
}
.food-content_amount {
  margin-bottom: 5px;
}
.add-btn {
  /* ボタンを中央にしたい */
  padding-top: 13px;
}
</style>
