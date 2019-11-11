<template>
  <strong-text class="user-name">
    {{ $store.state.user.user.email }}
    さんのマイページ
  </strong-text>
</template>

<script>
import StrongText from '~/components/atoms/Text/StrongText'

export default {
  components: {
    StrongText
  }
}
</script>

<style scoped>
.user-name {
  font-size: 1.25em;
}
</style>
