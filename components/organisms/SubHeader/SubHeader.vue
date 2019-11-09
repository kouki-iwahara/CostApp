<template>
  <div>
    <bread-crumb
      class="content_header_bread-crumb"
      :link="`/home/food/`"
      list-name="食材"
    >
      <span slot="link-name">マイページ</span>
    </bread-crumb>

    <tab-link
      :is-register-active="isRegisterActive"
      :is-view-active="isViewActive"
      :param-id-page="`/home/food/${food.paramId}`"
      :register-page="`/home/food/register`"
      :to="`/home/food/${food.paramId}`"
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
    isViewActive: {
      type: Boolean
    },
    isRegisterActive: {
      type: Boolean
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
    if (this.$store.getters['food/foods'].length !== 0) {
      this.food.paramId = this.$store.getters['food/foods'][0].id
    }
  }
}
</script>

<style></style>
