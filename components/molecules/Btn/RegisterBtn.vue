<template>
  <green-btn @registerRecipe="registerRecipe()" @registerFood="registerFood()">
    <spinner v-show="isClickBtn" />
    <span v-show="!isClickBtn">登録</span>
  </green-btn>
</template>

<script>
import GreenBtn from '~/components/atoms/Btn/GreenBtn'
import Spinner from '~/components/atoms/Spinner/Spinner'

export default {
  components: {
    GreenBtn,
    Spinner
  },
  props: {
    isClickBtn: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    registerFood() {
      this.$emit('registerFood')
    },
    registerRecipe() {
      this.$emit('registerRecipe')
    }
  }
}
</script>

<style scoped>
.nav-link {
  border: none;
  padding: 0;
  color: #fff;
}
</style>
