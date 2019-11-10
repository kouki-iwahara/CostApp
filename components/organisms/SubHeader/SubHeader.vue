<template>
  <div>
    <bread-crumb
      class="content_header_bread-crumb"
      :link="`/home/food/`"
      :list-name="listName"
    >
      <span slot="link-name">マイページ</span>
    </bread-crumb>

    <tab-link
      :is-values="isValues"
      :is-register-active="isRegisterActive"
      :is-view-active="isViewActive"
      :param-id-page="paramIdPage"
      :register-page="registerPage"
    >
      <template slot="btn">
        <slot name="btn" />
      </template>
    </tab-link>
  </div>
</template>

<script>
import BreadCrumb from '~/components/molecules/BreadCrumb/BreadCrumb.vue'
import TabLink from '~/components/molecules/NavTab/TabLink'

export default {
  components: {
    BreadCrumb,
    TabLink
  },
  props: {
    listName: {
      type: String,
      default: null
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
    },
    paramIdPage: {
      type: String,
      required: true
    },
    registerPage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      food: {
        paramId: ''
      }
    }
  },
  created() {
    // if (this.$store.getters['food/foods'].length !== 0) {
    //   this.food.paramId = this.$store.getters['food/foods'][0].id
    // }
  }
}
</script>

<style></style>
