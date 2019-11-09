<template>
  <button
    type="button"
    class="nav-btn btn btn-success btn-md"
    @click="registerFood"
  >
    <div v-show="isClickBtn" class="spinner-border text-light">
      <span class="sr-only">Loading...</span>
    </div>
    <span v-show="!isClickRegisterBtn">登録</span>
  </button>
</template>

<script>
export default {
  props: {
    isClickBtn: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    registerFood() {
      this.$emit('registerFood')
    }
  }
}
</script>

<style scoped>
.nav-btn {
  display: block;
  margin: 0 0 0 auto;
  width: 58px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}
</style>
