<template>
  <nav>
    <div id="nav-tab" class="nav nav-tabs">
      <!-- 登録されていたらリンクを表示 -->
      <nuxt-link
        v-show="isValues.length"
        :to="paramIdPage"
        :class="{ active: isViewActive }"
        class="nav-item nav-link"
      >
        表示
      </nuxt-link>
      <!-- 登録されていなかったらアラート -->
      <div
        v-show="!isValues.length"
        slot="nav-item"
        class="nav-item nav-link"
        @click="showAlert"
      >
        表示
      </div>

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
    },
    isValues: {
      type: Array,
      default: null
    }
  },
  methods: {
    showAlert() {
      alert('登録されていません')
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

.nav-item {
  cursor: pointer;
}

.nav-link {
  padding: 6px 24px;
}
</style>
