<template>
  <nav-tag>
    <nav-item
      link="/home/food"
      :class="{ active: isFoodActive, inactive: isFoodInactive }"
    >
      食材
    </nav-item>
    <nav-item
      link="/home/recipe"
      :class="{ active: isRecipeActive, inactive: isRecipeInactive }"
    >
      レシピ
    </nav-item>
    <b-nav-item disabled class="inactive" to="#">メニュー(準備中)</b-nav-item>
    <b-nav-item disabled class="inactive" to="#">コース(準備中)</b-nav-item>
  </nav-tag>
</template>

<script>
import NavTag from '~/components/atoms/Nav/NavTag'
import NavItem from '~/components/atoms/Nav/NavItem'

export default {
  components: {
    NavTag,
    NavItem
  },
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
