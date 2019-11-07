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
        <register-btn
          :is-click-register-btn="isClickRegisterBtn"
          @registerFood="registerFood"
        />
      </template>
    </tab-link>
  </div>
</template>

<script>
import BreadCrumb from '~/components/molecules/BreadCrumb/BreadCrumb.vue'
import TabLink from '~/components/molecules/NavTab/TabLink'
import RegisterBtn from '~/components/atoms/btn/RegisterBtn'

export default {
  components: {
    BreadCrumb,
    TabLink,
    RegisterBtn
  },
  props: {
    isViewActive: {
      type: Boolean
    },
    isRegisterActive: {
      type: Boolean
    },
    isClickRegisterBtn: {
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
    this.food.paramId = this.$store.getters['food/foods'][0].id
  },
  methods: {
    registerFood() {
      this.$emit('registerFood')
    }
  }
}
</script>

<style></style>
