<template>
  <nav>
    <div id="nav-tab" class="nav nav-tabs" role="tablist">
      <nuxt-link
        :to="paramIdPage"
        :class="{ active: isViewActive }"
        class="nav-item nav-link"
      >
        表示
      </nuxt-link>
      <nuxt-link
        :to="registerPage"
        :class="{ active: isRegisterActive }"
        class="nav-item nav-link"
      >
        登録
      </nuxt-link>
      <slot name="btn-form" />
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    paramIdPage: {
      type: String,
      required: true
    },
    registerPage: {
      type: String,
      required: true
    },
    isViewActive: {
      type: Boolean
    },
    isRegisterActive: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
#nav-tab {
  padding-top: 20px;
  padding-left: 15px;
}
#nav-tab .active {
  background-color: #fafbfc;
  border-bottom: none;
}
</style>
