<template>
  <button
    type="button"
    class="nav-btn btn btn-success btn-md"
    @click="
      registerFood()
      updateFood()
      registerRecipe()
      updateRecipe()
    "
  >
    <slot />
  </button>
</template>

<script>
export default {
  methods: {
    updateFood() {
      this.$emit('updateFood')
    },
    registerFood() {
      this.$emit('registerFood')
    },
    registerRecipe() {
      this.$emit('registerRecipe')
    },
    updateRecipe() {
      this.$emit('updateRecipe')
    }
  }
}
</script>

<style scoped>
.nav-btn {
  display: block;
  width: 58px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}
</style>
