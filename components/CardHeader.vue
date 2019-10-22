<template>
  <div>
    <div class="card-header">
      <b-navbar class="header navbar" toggleable="md">
        <b-navbar-nav class="nav-list_item">
          <slot name="navbar" />
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="card-body">
      <slot name="card-body" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.card-header {
  border: none;
  padding: 0;
}
.navbar {
  border: none;
  padding: 0;
}
</style>
