<template>
  <input
    :valu="value"
    type="number"
    :placeholder="placeholder"
    @input="updateValue"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  methods: {
    updateValue(e) {
      const text = e.target.value
      console.log(text)
      this.$emit('input', text)
    }
  }
}
</script>

<style></style>
