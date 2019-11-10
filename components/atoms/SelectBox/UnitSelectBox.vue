<template>
  <select :value="value" @input="updateValue">
    <option selected disabled value="">単位</option>
    <option>g</option>
    <option>kg</option>
    <option>ml</option>
    <option>L</option>
    <option>cc</option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style></style>
