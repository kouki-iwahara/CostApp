<template>
  <div>
    <div class="content container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <bread-crumb>
            <li
              slot="breadcrumb-item"
              class="breadcrumb-item active"
              aria-current="page"
            >
              レシピ一覧
            </li>
          </bread-crumb>
          <all-recipes-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '~/components/BreadCrumb.vue'
import AllRecipesTable from '~/components/top/AllRecipesTable.vue'

export default {
  components: {
    BreadCrumb,
    AllRecipesTable
  }
}
</script>

<style scoped>
.content {
  padding-top: 25px;
}
</style>
