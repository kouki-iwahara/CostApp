<template>
  <input :value="value" type="range" @input="updateValue" />
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 100
    }
  },
  created() {
    console.log(this.value)
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
