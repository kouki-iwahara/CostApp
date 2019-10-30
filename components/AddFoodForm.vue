<template>
  <div class="col-sm-12">
    <div class="row">
      <div class="add-form col-sm-12 border rounded">
        <div class="message col-sm-12 border-bottom">
          <strong>食材をレシピに追加</strong>
        </div>
        <div class="message col-sm-12">
          <p>
            追加したい食材を左の食材リストからクリックすると食材名が表示されます。<br />
            使用量を入力し追加して下さい。
          </p>
        </div>
        <div class="row">
          <!-- 食材名 -->
          <div class="food-content col-sm-3">
            <strong>食材名</strong>
            <div>
              <span>
                {{ foodName }}
              </span>
            </div>
          </div>
          <!-- 使用量 -->
          <div class="food-content col-sm-3">
            <div class="food-content_amount">
              <strong>使用量</strong>
            </div>
            <div class="input-group input-group-sm">
              <input
                type="number"
                :value="value"
                class="form-control rounded-0"
                placeholder="使用量"
                min="0"
                aria-describedby="inputGroup-sizing-sm"
                @input="updateValue"
              />
              <div class="input-group-prepend">
                <span
                  id="inputGroup-sizing-sm"
                  class="input-group-text rounded-0"
                >
                  {{ foodUnit }}
                </span>
              </div>
            </div>
          </div>
          <!-- 原価 -->
          <div class="food-content col-sm-3">
            <strong>使用原価(円)</strong>
            <div>
              <span> {{ foodCost }} </span>
            </div>
          </div>
          <!-- ボタン -->
          <div class="col-sm-3">
            <button
              slot="btn"
              type="button"
              class="add-btn btn btn-success btn-sm"
              @click="addFoodToRecipe"
            >
              <span>追加</span>
            </button>
            <button
              slot="btn"
              type="button"
              class="cancel-btn btn btn-warning btn-sm"
              @click="initializeForm"
            >
              <span>削除</span>
            </button>
          </div>
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
.add-form {
  padding: 15px;
  background-color: #fff;
}
.message {
  padding: 0;
  margin-bottom: 5px;
}

.food-content {
  padding: 8px 12px;
}

.add-btn {
  width: 60px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}

.cancel-btn {
  width: 60px;
  font-weight: 600;
  color: rgb(72, 72, 72);
  border-radius: 0.25em;
  background-color: #f1e05a;
  background-image: linear-gradient(-180deg, #f1e05a, #d8c114 90%);
}
</style>
