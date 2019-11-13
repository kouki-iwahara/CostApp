<template>
  <button type="button" class="nav-btn btn btn-warning btn-md">
    <slot />
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.nav-btn {
  display: block;
  font-weight: 600;
  border-radius: 0.25em;
  border-color: #ffc107;
  background-image: linear-gradient(-180deg, #f7b733, #fc4a1a 90%);
}
</style>
