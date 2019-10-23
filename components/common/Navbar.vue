<template>
  <!-- Right aligned nav items -->
  <b-nav justified>
    <b-nav-item class="active" to="/home/food">食材</b-nav-item>
    <b-nav-item class="inactive" to="/home/recipe">レシピ</b-nav-item>
  </b-nav>
</template>

<script></script>

<style scoped>
.nav {
  border-bottom: 1px solid #dee2e6;
}
.inactive:hover {
  border-bottom: 2px solid #dee2e6;
}
.content {
  width: 1024px;
  /* height: 300px; */
  margin: 0 auto;
  /* background-color: blue; */
}
.active {
  border-bottom: 2px solid #f7b733;
  font-weight: 600;
}
</style>
