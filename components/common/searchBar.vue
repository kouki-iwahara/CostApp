<template>
  <input type="text" class="form-control" @input="updateValue" />
</template>

<script>
export default {
  methods: {
    // 入力されたテキストを親に渡す
    updateValue(e) {
      console.log(e.target)
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style></style>
