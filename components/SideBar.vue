<template>
  <div class="container-fluid">
    <div class="sidebar row">
      <div class="sidebar_search col-sm-3 hidden-xs">
        <div class="nav-list_info bg-dark text-light">
          <slot name="sidebar_content" />
        </div>
      </div>
      <div class="sidebar_list col-sm-3 hidden-xs">
        <slot name="content-list" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* sidebar */
.sidebar_search,
.sidebar_list {
  display: none;
}
.sidebar_list ul {
  text-align: center;
}

.nav-list_info {
  text-align: center;
  line-height: 50px;
  margin: 0px 0px;
  height: 50px;
  border-radius: 5px 5px 0 0;
}

@media screen and (min-width: 768px) {
  .sidebar_search {
    display: block;
    position: absolute;
    top: 80px;
    left: 0;
  }
  .sidebar_list {
    position: absolute;
    top: 130px;
    bottom: 0;
    left: 0;
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .food-list_item:hover {
    cursor: pointer;
    opacity: 0.5;
    -webkit-filter: brightness(0.9);
    filter: brightness(0.9);
  }
}
</style>
