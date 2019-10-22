<template>
  <nav aria-label="パンくずリスト">
    <ol class="breadcrumb mb-1">
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
.breadcrumb li .nav-link {
  display: inline;
  padding: 0;
}
</style>
