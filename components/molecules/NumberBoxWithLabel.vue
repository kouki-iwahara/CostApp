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
      <div class="input-group-append">
        <slot name="input-append" />
      </div>
    </div>
  </div>
</template>

<script>
import InputLabel from '~/components/atoms/Label/InputLabel'
import NumberInput from '~/components/atoms/NumberBox/NumberInput'

export default {
  components: {
    InputLabel,
    NumberInput
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
.custom-select {
  margin-left: 5px;
  padding: 2px 28px 1px 12px;
  height: 31px;
}
</style>
