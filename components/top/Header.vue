<template>
  <div>
    <b-navbar class="header fixed-top navbar" type="dark" toggleable="md">
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse
        id="nav_collapse"
        class="nav-list collapse navbar-collapse"
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
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link">
                トップ
              </nuxt-link>
            </li>
            <li v-show="isLogin" class="nav-item">
              <nuxt-link to="/home/food" class="nav-link">
                マイページ
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/recipeList" class="nav-link">
                レシピ一覧
              </nuxt-link>
            </li>
          </ul>
        </b-navbar-nav>
        <!-- /nav-list_item -->
        <div class="nav-list_item_btn">
          <b-dropdown v-if="isLogin" variant="light" right>
            <template v-slot:button-content>
              {{ userName }}
            </template>
            <nuxt-link to="/home/food" class="nav-link">
              マイページ
            </nuxt-link>
            <nuxt-link to="/home/food" class="nav-link">
              食材登録
            </nuxt-link>
            <nuxt-link to="/home/food" class="nav-link">
              レシピ登録
            </nuxt-link>

            <b-dropdown-divider />
            <div class="signout" @click="signOut">
              <span>ログアウト</span>
            </div>
          </b-dropdown>

          <button
            v-else
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
  data() {
    return {
      isLogin: this.$store.getters['user/user']
    }
  },
  computed: {
    // *後でDBにuserNameのカラムを作る
    userName() {
      const pos = this.isLogin.email.indexOf('@')
      const name = this.isLogin.email.substring(0, pos)
      return name
    }
  },
  methods: {
    toSignin() {
      this.$router.push('/signin')
    },
    async signOut() {
      await this.$store.dispatch('user/signOut').catch((error) => {
        console.log(error)
      })
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>
.header {
  padding-left: 0;
  padding-right: 0;
  height: 60px;
  background: #24292e;
}

/* nav-list */
.nav-list {
  margin: 0 auto;
  max-width: 1024px;
  opacity: 0.9;
}
.nav-item .nav-link {
  color: #fff;
  font-weight: 600;
}

.nav-list_item {
  display: flex;
  justify-content: flex-end;
  padding-left: 17px;
}
.nav-list_item_btn {
  padding-right: 15px;
  margin: 0 0 0 auto;
}
.signout {
  text-align: center;
}
.signout:hover {
  cursor: pointer;
  background: #fc4a1a;
  background: linear-gradient(to right, #f7b733, #fc4a1a);
  color: #fff;
}
.dropdown-menu .nav-link {
  color: #212529;
  text-align: center;
  line-height: 24px;
  height: 24px;
  padding: 0px 24px;
  margin-bottom: 8px;
}
.dropdown-menu .nav-link:hover {
  background: #fc4a1a;
  background: linear-gradient(to right, #f7b733, #fc4a1a);
  color: #fff;
}
.search-form {
  margin-left: 15px;
}
.nav-form {
  display: none;
}
/* /nav-list */
@media screen and (min-width: 768px) {
  .nav-list {
    margin: 0 auto;
    height: 60px;
    max-width: 1024px;
  }
  .nav-form {
    display: block;
  }
  .nav-link {
    height: 60px;
    line-height: 45px;
  }
}
</style>
