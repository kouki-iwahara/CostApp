<template>
  <div>
    <div class="content container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <!-- <bread-crumb>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item active"
              aria-current="page"
            >
              マイページ
            </li>
          </bread-crumb> -->
          <slot name="my-table" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BreadCrumb from '~/components/BreadCrumb.vue'

export default {
  components: {
    // BreadCrumb
  }
}
</script>

<style scoped>
.content {
  padding-top: 25px;
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
