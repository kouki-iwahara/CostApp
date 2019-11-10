<template>
  <green-btn @updateFood="updateFood">
    <spinner v-show="isClickBtn" />
    <span v-show="!isClickBtn">更新</span>
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
    updateFood() {
      this.$emit('updateFood')
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
