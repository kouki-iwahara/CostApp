<template>
  <div>
    <input-label>
      <span slot="require-mark" class="require-mark">{{ requireMark }}</span>
      <strong slot="label-name">{{ labelName }}</strong>
    </input-label>
    <div class="input-group input-group-sm">
      <text-input
        :value="value"
        :placeholder="placeholder"
        class="form-control rounded"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/atoms/TextBox/TextInput'
import InputLabel from '~/components/atoms/Label/InputLabel'

export default {
  components: {
    TextInput,
    InputLabel
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

<style></style>
