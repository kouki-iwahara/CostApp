<template>
  <ul @click="toFoodPage">
    <slot />
  </ul>
</template>

<script>
export default {
  methods: {
    toFoodPage() {
      this.$emit('toFoodPage')
    }
  }
}
</script>

<style></style>
