<template>
  <div>
    <img class="img-fluid img-thumbnail mx-auto d-block" :src="image" alt="" />
    <slot name="input-file" />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: [Object, String],
      required: true
    }
  }
}
</script>

<style scoped>
.img-thumbnail {
  border: none;
}

img {
  height: 300px;
}
</style>
