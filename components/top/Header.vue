<template>
  <div>
    <b-navbar class="header fixed-top navbar" type="dark" toggleable="md">
      <div class="header_toggle">
        <b-navbar-toggle target="nav_collapse" />
      </div>
      <b-collapse
        id="nav_collapse"
        class="nav-list collapse navbar-collapse"
        is-nav
      >
        <!-- 検索バー -->
        <b-nav-form class="nav-form">
          <b-form-input
            v-model="searchText"
            size="sm"
            class="mr-sm-2 search-form"
            type="text"
            placeholder="レシピ名を検索"
          />
        </b-nav-form>
        <!-- 検索結果 -->
        <div v-show="searchText" class="header-search-list">
          <ul
            v-for="item in searchResults"
            v-show="searchResults.length"
            :key="item.id"
            class="list-group list-group-flush"
          >
            <li class="list-group-item">
              <nuxt-link :to="`/recipe/${item.id}`" class="nav-link match">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
          <ul v-show="!searchResults.length" class="list-group-item">
            <li class="nav-link">登録がありません</li>
          </ul>
        </div>
        <!-- min-width: 768pxまで表示 -->
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
              <nuxt-link to="/recipe" class="nav-link">
                レシピ一覧
              </nuxt-link>
            </li>
          </ul>
        </b-navbar-nav>
        <!-- /nav-list_item -->

        <!-- min-width: 768pxから表示 -->
        <b-navbar-nav class="nav-list_item-mobile">
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
              <nuxt-link to="/recipe" class="nav-link">
                レシピ一覧
              </nuxt-link>
            </li>
            <li v-show="isLogin" class="nav-item">
              <nuxt-link to="/home/food/register" class="nav-link">
                食材登録
              </nuxt-link>
            </li>
            <li v-show="isLogin" class="nav-item">
              <nuxt-link to="/home/recipe/register" class="nav-link">
                レシピ登録
              </nuxt-link>
            </li>
            <li
              v-show="isLogin"
              class="nav-item nav-link nav-list_item-mobile_sign"
              @click="signOut"
            >
              <strong>ログアウト</strong>
            </li>
            <li
              v-show="!isLogin"
              class="nav-item nav-link nav-list_item-mobile_sign"
              @click="toSignin"
            >
              <strong>ログイン</strong>
            </li>
          </ul>
        </b-navbar-nav>

        <!-- min-width: 768pxまで表示 -->
        <div class="nav-list_item_btn">
          <b-dropdown v-if="isLogin" variant="light" right>
            <template v-slot:button-content>
              {{ userName }}
            </template>
            <nuxt-link to="/home/food" class="nav-link">
              マイページ
            </nuxt-link>
            <nuxt-link to="/home/food/register" class="nav-link">
              食材登録
            </nuxt-link>
            <nuxt-link to="/home/recipe/register" class="nav-link">
              レシピ登録
            </nuxt-link>

            <b-dropdown-divider />
            <div class="signout" @click="signOut">
              <span>ログアウト</span>
            </div>
          </b-dropdown>

          <button v-else class="signin-btn btn" type="button" @click="toSignin">
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
      searchText: '',
      isLogin: this.$store.getters['user/user']
    }
  },
  computed: {
    // *後でDBにuserNameのカラムを作る
    userName() {
      const pos = this.isLogin.email.indexOf('@')
      const name = this.isLogin.email.substring(0, pos)
      return name
    },
    searchResults() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/allUsersRecipes'].slice()
      if (!this.searchText) {
        return filterRecipes
      }
      recipes.forEach((recipe) => {
        if (recipe.name.includes(this.searchText)) {
          filterRecipes.push(recipe)
        }
      })
      return filterRecipes
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
.header_toggle {
  padding-left: 15px;
}
.header-search-list {
  position: absolute;
  top: 50px;
  bottom: -500px;
  margin: 2px 0 0 15px;
  padding: 8px 0;
  width: 12rem;
  z-index: 1000;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 0.25rem;
}
.header-search-list .nav-link {
  color: #fff;
  height: 24px;
  padding: 0 24px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header-search-list .match:hover {
  background: linear-gradient(to right, #f7b733, #fc4a1a);
  color: #212529;
}
.list-group-item {
  background-color: rgb(2, 2, 2);
  opacity: 0.9;
  padding: 10px 0;
  margin-bottom: 8px;
}

/* nav-list */
.nav-list {
  background-color: black;
  margin: 0 auto;
  max-width: 1024px;
  opacity: 0.8;
}
.nav-item .nav-link {
  color: #fff;
  font-weight: 600;
}

.nav-list_item {
  display: none;
}

.nav-list_item-mobile {
  display: flex;
  padding-top: 30px;
  padding-left: 15px;
}

.nav-list_item-mobile .nav-link {
  margin-bottom: 10px;
}

.nav-list_item-mobile_sign {
  cursor: pointer;
  margin-top: 30px;
}
.nav-list_item-mobile_sign strong {
  color: #fff;
}
.nav-list_item_btn {
  display: none;
  padding-right: 15px;
  margin: 0 0 0 auto;
}

.signout {
  text-align: center;
}
.signout:hover {
  cursor: pointer;
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
  background: linear-gradient(to right, #f7b733, #fc4a1a);
  color: #fff;
}
.search-form {
  margin-left: 15px;
}
.nav-form {
  display: none;
}
.signin-btn {
  background-color: #e9ecef;
  background-image: linear-gradient(-180deg, #f4f5f7, #e9ecef 90%);
}
/* /nav-list */
@media screen and (min-width: 768px) {
  .header_toggle {
    padding-left: 0;
  }
  .nav-list {
    margin: 0 auto;
    height: 60px;
    max-width: 1024px;
    background: #24292e;
  }

  .nav-form {
    display: block;
  }

  .nav-link {
    height: 60px;
    line-height: 45px;
  }

  .nav-list_item {
    display: flex;
    padding-left: 15px;
  }

  .nav-list_item-mobile {
    display: none;
  }

  .nav-list_item_btn {
    display: block;
  }
}
</style>
