<template>
  <orange-btn>
    <nuxt-link class="nav-link" :to="link">
      変更
    </nuxt-link>
  </orange-btn>
</template>

<script>
import OrangeBtn from '~/components/atoms/Btn/OrangeBtn'

export default {
  components: {
    OrangeBtn
  },
  props: {
    link: {
      type: String,
      default: null
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
