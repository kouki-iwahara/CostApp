<template>
  <b-nav justified>
    <b-nav-item
      :class="{ active: isFoodActive, inactive: isFoodInactive }"
      to="/home/food"
      >食材</b-nav-item
    >
    <b-nav-item
      :class="{ active: isRecipeActive, inactive: isRecipeInactive }"
      to="/home/recipe"
      >レシピ</b-nav-item
    >
    <b-nav-item disabled class="inactive" to="#">メニュー(準備中)</b-nav-item>
    <b-nav-item disabled class="inactive" to="#">コース(準備中)</b-nav-item>
  </b-nav>
</template>

<script>
export default {
  props: {
    isFoodActive: {
      type: Object,
      default: null
    },
    isRecipeActive: {
      type: Object,
      default: null
    },
    isFoodInactive: {
      type: Object,
      default: null
    },
    isRecipeInactive: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.inactive {
  border-bottom: 1px solid #a8adb1;
}
.inactive:hover {
  border-bottom: 2px solid #a8adb1;
}

.active {
  border-bottom: 2px solid #f7b733;
  font-weight: 600;
}
</style>
