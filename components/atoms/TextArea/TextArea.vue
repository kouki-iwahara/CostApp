<template>
  <textarea
    id="comment"
    :value="value"
    class="form-control"
    rows="6"
    maxlength="255"
    placeholder="注意点や課題など(255文字まで)"
    @input="updateValue"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue(e) {
      const text = e.target.value
      this.$emit('input', text)
    }
  }
}
</script>

<style></style>
