<template>
  <div>
    <div class="content container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <bread-crumb />
          <slot name="my-table" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '~/components/home/BreadCrumb.vue'

export default {
  components: {
    BreadCrumb
  },
  async created() {
    const res = await this.$store
      .dispatch('food/getFoodData')
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
    // ユーザー認証が切れていたらsigninに遷移
    if (res.error) {
      alert(res.error)
      this.$router.push({ path: '/signin' })
    }
  }
}
</script>

<style scoped>
.content {
  padding-top: 25px;
  position: absolute;
  top: 70px;
  bottom: 0;
  right: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
