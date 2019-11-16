<template>
  <div>
    <Header />
    <div class="container">
      <div class="wrapper">
        <div class="login-form row">
          <div class="col-sm-12">
            <div class="form-signin">
              <h3 class="form-signin-heading">アカウント作成</h3>

              <label for="email">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                name="email"
                placeholder="Email"
                required=""
                autofocus=""
              />
              <label for="password">password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                required=""
              />

              <button
                class="login-form_btn btn btn-lg btn-block"
                @click="signUp"
              >
                アカウント作成
              </button>
              <div class="nav">
                <nuxt-link to="/" class="nav-link">
                  トップ
                </nuxt-link>
                <nuxt-link to="/signIn" class="nav-link">
                  ログイン
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/top/Header.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    // emailとpasswordでsignup処理
    async signUp() {
      const reqUserInfo = {
        email: this.email,
        password: this.password
      }
      // 入力されたデータをpost 成功でresult.userにuser情報が格納される
      const res = await this.$store.dispatch('user/signUp', reqUserInfo)
      alert(res.message)
      // 登録完了ならsigninページに遷移
      if (res.user) {
        return this.$router.push({ path: '/signin' })
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding-top: 30px;
}

.login-form {
  padding-top: 60px;
  padding-bottom: 30px;
}

.form-signin {
  max-width: 420px;
  padding: 30px 38px;
  margin: 0 auto;
  background-color: #fff;
  border: 3px dotted rgba(0, 0, 0, 0.214);
}

.form-signin-heading {
  text-align: center;
  margin-bottom: 30px;
}

.form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
}

input[type='text'] {
  margin-bottom: 20px;
}

input[type='password'] {
  margin-bottom: 52px;
}

.nav {
  display: flex;
  justify-content: center;
}

.login-form_btn {
  margin-bottom: 20px;
  height: 46px;
  line-height: 23px;
  box-sizing: border-box;
  background-color: #e9ecef;
  background-image: linear-gradient(-180deg, #f4f5f7, #e9ecef 90%);
}
.login-form_btn:hover {
  border: 2px solid rgb(215, 215, 215);
}
</style>
