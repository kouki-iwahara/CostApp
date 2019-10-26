<template>
  <div class="">
    <footer>
      <div class="container">
        <div class="row">
          <div class="copy-right col-sm-12">
            <small
              >&copy; 2019-<span>{{ thisYear }}</span> koki-iwahara</small
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    thisYear() {
      const date = new Date()
      const thisYear = date.getFullYear()
      return thisYear
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1024px;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

footer {
  background-color: #f4f5f7;
  margin-top: 30px;
  padding-bottom: 30px;
}
.copy-right {
  padding-top: 30px;
}
</style>
