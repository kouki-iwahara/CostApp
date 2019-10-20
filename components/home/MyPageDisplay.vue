<template>
  <div>
    <div class="content container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <bread-crumb />
          <slot name="my-table" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '~/components/home/BreadCrumb.vue'

export default {
  components: {
    BreadCrumb
  }
}
</script>

<style scoped>
.content {
  padding-top: 25px;
  position: absolute;
  top: 70px;
  bottom: 0;
  right: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
