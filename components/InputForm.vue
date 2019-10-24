<template>
  <div class="input-group input-group-sm">
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      min="0"
      class="form-control rounded-0"
      aria-describedby="inputGroup-sizing-sm"
      @input="updateValue"
    />
    <slot name="input-append" />
  </div>
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
      required: false,
      default: '入力してください'
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue(e) {
      console.log(e.target)
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>
/* .input-group-text {
  background: none;
  border: none;
  border-bottom: 1px solid;
}
input {
  border: none;
  border-bottom: 1px solid;
  border-radius: 0;
} */
</style>
