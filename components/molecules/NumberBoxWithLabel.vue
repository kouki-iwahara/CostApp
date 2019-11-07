<template>
  <div>
    <input-label>
      <span slot="require-mark" class="require-mark">{{ requireMark }}</span>
      <strong slot="label-name">{{ labelName }}</strong>
    </input-label>
    <div class="input-group input-group-sm">
      <number-input
        :value="value"
        :placeholder="placeholder"
        class="form-control rounded"
        @input="updateValue"
      />
      <div slot="input-append" class="input-group-append">
        <!-- <unit v-show="isFoodValue">
          円
        </unit> -->
        <span-text
          v-show="isFoodValue"
          id="inputGroup-sizing-sm"
          class="input-group-text rounded-0"
        >
          円
        </span-text>
        <unit-select-box v-show="isFoodAmount" class="custom-select" />
      </div>
    </div>
  </div>
</template>

<script>
import InputLabel from '~/components/atoms/Label/InputLabel'
import NumberInput from '~/components/atoms/NumberBox/NumberInput'
import SpanText from '~/components/atoms/Text/SpanText'
import UnitSelectBox from '~/components/atoms/SelectBox/UnitSelectBox'

export default {
  components: {
    InputLabel,
    NumberInput,
    UnitSelectBox,
    SpanText
  },
  props: {
    value: {
      type: String,
      default: null
    },
    labelName: {
      type: String,
      default: null
    },
    requireMark: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    isFoodValue: {
      type: Boolean,
      default: null
    },
    isFoodAmount: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    updateValue(text) {
      this.$emit('input', text)
    }
  }
}
</script>

<style scoped>
.input-group-text {
}

.custom-select {
  margin-left: 5px;
  padding: 2px 28px 1px 12px;
  height: 31px;
}
</style>
