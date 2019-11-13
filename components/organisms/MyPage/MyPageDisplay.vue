<template>
  <div>
    <div class="content container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <user-name />
        </div>
        <div class="col-sm-12">
          <slot name="nav" />
        </div>
        <div class="col-sm-6">
          <slot name="text-input" />
        </div>
        <div>
          <slot name="btn" />
          <slot name="my-table" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // UserName
  }
}
</script>

<style></style>
