<template>
  <nav aria-label="パンくずリスト">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <nuxt-link to="/" class="nav-link">
          トップ
        </nuxt-link>
      </li>
      <slot name="breadcrumb-item" />
    </ol>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.breadcrumb {
  height: 38px;
  padding: 6px 12px;
  margin-top: 14px;
  margin-bottom: 0;
  background-color: #f4f5f7;
  /* background-color: #f2f2f2; */
}
.breadcrumb li .nav-link {
  display: inline;
  padding: 0;
}
</style>
