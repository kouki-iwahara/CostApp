<template>
  <div class="col-sm-12">
    <div class="row">
      <div class="label">
        <strong>食材の登録</strong>
      </div>
      <div class="add-form col-sm-12 border rounded">
        <div class="message col-sm-12 border-bottom">
          <p>
            食材を選択すると食材名が表示されます。<br />
            使用量を入力し追加して下さい。
          </p>
        </div>

        <div class="row">
          <div class="col-sm-12">
            <slot name="modal" />
          </div>
          <!-- 食材名 -->
          <div class="food-content col-sm-3">
            <strong>食材名</strong>
            <div>
              <span>
                {{ foodName }}
              </span>
            </div>
            <div>
              <small> {{ foodCost }} </small>
              <small>円/{{ foodUnit }}</small>
            </div>
          </div>
          <!-- 使用量 -->
          <div class="food-content col-sm-5">
            <div class="food-content_amount">
              <strong>使用量</strong>
            </div>
            <div class="input-group input-group-sm">
              <input
                ref="addFood"
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
          <!-- ボタン -->
          <div class="btn-area col-sm-4">
            <button
              type="button"
              class="add-btn btn btn-success btn-sm"
              @click="addFoodToRecipe"
            >
              <span>追加</span>
            </button>
            <button
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
      default: null
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
.label {
  margin-bottom: 8px;
}

.add-form {
  padding: 15px;
  background-color: #fff;
}

.message {
  padding: 0;
  margin-bottom: 5px;
}

.food-content {
  padding: 8px 15px;
}

.food-content .input-group {
  margin-bottom: 10px;
}

.add-btn {
  height: 31px;
  width: 60px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}

.cancel-btn {
  margin-right: 20px;
  height: 31px;
  width: 60px;
  font-weight: 600;
  color: rgb(72, 72, 72);
  border-radius: 0.25em;
  background-color: #f1e05a;
  background-image: linear-gradient(-180deg, #f1e05a, #d8c114 90%);
}

@media screen and (min-width: 576px) {
  .btn-area {
    padding-top: 31px;
  }
}

@media screen and (min-width: 768px) {
  .btn-area {
    display: flex;
    justify-content: space-between;
  }

  .food-content .input-group {
    margin-bottom: 0;
  }
}
</style>
