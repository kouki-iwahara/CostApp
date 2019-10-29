<template>
  <nav aria-label="パンくずリスト">
    <ol class="breadcrumb">
      <slot name="breadcrumb-item-top">
        <li class="breadcrumb-item">
          <nuxt-link to="/home/food" class="nav-link">
            マイページ
          </nuxt-link>
        </li>
      </slot>
      <slot name="breadcrumb-item" />
    </ol>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
nav {
  margin: 20px 0 10px;
}

.breadcrumb {
  padding: 6px 12px;
  margin-bottom: 0;
}
.breadcrumb li .nav-link {
  display: inline;
  padding: 0;
}
</style>
