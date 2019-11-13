<template>
  <b-nav-item :to="link">
    <slot />
  </b-nav-item>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: null
    }
  }
}
</script>

<style></style>
