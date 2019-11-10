<template>
  <div>
    <input-label>
      <strong slot="label-name">{{ labelName }}</strong>
      <span slot="label-name">{{ foodYield }}％</span>
    </input-label>
    <range-input
      id="customRange1"
      class="custom-range"
      :value="value"
      @input="updateValue"
    />
  </div>
</template>

<script>
import InputLabel from '~/components/atoms/Label/InputLabel'
import RangeInput from '~/components/atoms/Range/RangeInput'

export default {
  components: {
    InputLabel,
    RangeInput
  },
  props: {
    value: {
      type: [Number, String],
      default: 100
    },
    labelName: {
      type: String,
      default: null
    },
    foodYield: {
      type: [Number, String],
      default: 100
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
