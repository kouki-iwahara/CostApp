<template>
  <div class="container-fluid">
    <div class="sidebar row">
      <div class="sidebar_search col-sm-3 hidden-xs">
        <slot name="sidebar_search" />
      </div>
      <div class="sidebar_list col-sm-3 hidden-xs">
        <div class="sidebar_list_content">
          <slot name="content-list" />
        </div>
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

.sidebar_list_content {
  border: 1px solid #e9ecef;
  border-bottom: none;
}
.sidebar_list ul {
  text-align: center;
}
.food-list_item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nav-list_info {
  background-color: #e9ecef;
  text-align: center;
  line-height: 50px;
  margin: 0px 0px;
  height: 50px;
  border-radius: 5px 5px 0 0;
}
.border-bottom {
  border-color: #f7b733;
}
.list-group-flush:last-child .list-group-item:last-child {
  border-bottom: 1px solid #f7b733;
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
    bottom: 15px;
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
