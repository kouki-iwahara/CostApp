<template>
  <orange-btn>
    <nuxt-link :to="link" class="nav-link">
      新規作成
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
  padding: 0;
  color: #fff;
}
</style>
