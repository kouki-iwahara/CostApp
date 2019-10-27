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
      <slot name="btn" />
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
nav {
  background-color: #e9ecef;
}
#nav-tab {
  padding: 20px 15px 0;
}
#nav-tab .active {
  background-color: #fafbfc;
  border-top: 3px solid #fc4a1a;
  border-bottom: none;
}
.nav-link {
  padding: 6px 24px;
}
</style>
