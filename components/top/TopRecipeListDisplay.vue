<template>
  <div class="content container-fluid">
    <!-- ヘッド部分始まり -->
    <div class="row">
      <div class="col-sm-6">
        <bread-crumb>
          <li slot="breadcrumb-item-top" class="breadcrumb-item">
            <nuxt-link to="/" class="nav-link">
              トップ
            </nuxt-link>
          </li>
          <li
            slot="breadcrumb-item"
            class="breadcrumb-item active"
            aria-current="page"
          >
            レシピ一覧
          </li>
        </bread-crumb>
      </div>
      <div class="col-sm-12">
        <div class="content_title border-bottom">
          <strong>レシピ一覧</strong>
        </div>
      </div>
    </div>
    <!-- ヘッド部分終わり -->

    <!-- テーブル始まり -->
    <div class="row">
      <div class="col-sm-12">
        <all-recipes-table />
      </div>
    </div>
    <!-- テーブル終わり -->
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
.content_title {
  font-size: 1.25em;
  margin: 20px 15px 30px;
}
</style>
