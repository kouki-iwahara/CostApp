<template>
  <input
    :valu="value"
    type="text"
    :placeholder="placeholder"
    @input="updateValue"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
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
