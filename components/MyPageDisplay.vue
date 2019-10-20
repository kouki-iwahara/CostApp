<template>
  <div>
    <div class="content container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <my-food-table />
        </div>
      </div>
      <!-- /content row -->
    </div>
  </div>
</template>

<script>
import MyFoodTable from '~/components/MyFoodTable.vue'

export default {
  components: {
    MyFoodTable
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
