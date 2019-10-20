<template>
  <div>
    <b-navbar
      class="header fixed-top navbar navbar-dark bg-dark"
      toggleable="md"
    >
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse
        id="nav_collapse"
        class="nav-list collapse navbar-collapse bg-dark"
        is-nav
      >
        <b-nav-form class="nav-form">
          <b-form-input
            size="sm"
            class="mr-sm-2 search-form"
            type="text"
            placeholder="レシピを検索"
          />
          <b-button size="sm" class="my-2 my-sm-0" type="button">検索</b-button>
        </b-nav-form>
        <b-navbar-nav class="nav-list_item">
          <ul class="navbar-nav">
            <!-- アクティブつけたい -->
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link active">
                みんなのレシピ
              </nuxt-link>
            </li>
          </ul>
        </b-navbar-nav>
        <!-- /nav-list_item -->
        <div class="nav-list_item_btn">
          <button
            class="signin-btn btn btn-light"
            type="button"
            @click="toSignin"
          >
            ログイン
          </button>
        </div>
      </b-collapse>
      <!-- /nav-list -->
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    toSignin() {
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>
.header {
  padding-left: 0;
  padding-right: 0;
  height: 70px;
  line-height: 70px;
}

/* nav-list */
.nav-list {
  margin: 0 auto;
  max-width: 1024px;
  opacity: 0.9;
}
.nav-list_item {
  display: flex;
  justify-content: flex-end;
}
.nav-list_item_btn {
  padding-right: 15px;
  margin: 0 0 0 auto;
}
.mr-sm-2 {
  margin-left: 15px;
}
.nav-form {
  display: none;
}
/* /nav-list */
@media screen and (min-width: 768px) {
  .nav-list {
    margin: 0 auto;
    height: 70px;
    max-width: 1024px;
  }
  .nav-form {
    display: block;
  }
}
</style>
