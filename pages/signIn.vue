<template>
  <div>
    <Header />
    <div class="container">
      <div class="wrapper">
        <!-- フォーム始まり -->
        <div class="login-form row d-flex align-items-center">
          <div class="col-sm-12">
            <form action="/signin" method="post" class="form-signin">
              <h3 class="form-signin-heading">ログイン</h3>

              <label for="email">Email</label>
              <span>(test@test.com)</span>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                name="email"
                placeholder="email"
                required=""
                autofocus=""
              />
              <label for="password">password</label>
              <span>(123456)</span>
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
                name="Submit"
                value="Login"
                type="button"
                @click="signIn"
              >
                ログイン
              </button>
              <div class="nav">
                <nuxt-link to="/signUp" class="nav-link">
                  アカウント作成
                </nuxt-link>
              </div>
            </form>
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
    // emailとpwdでsignin
    async signIn() {
      const reqUserInfo = {
        email: this.email,
        password: this.password
      }
      // 入力されたデータで認証処理
      const res = await this.$store.dispatch('user/signIn', reqUserInfo)
      // 成功でresにuserIdが格納されている
      if (res.userId) {
        alert(res.message)
        return this.$router.push({ path: '/home/food' })
      }
      // userIdが格納されていなかった＝ emailかpwdの入力ミスなのでその旨を表示する
      alert(res.message)
    }
  }
}
</script>

<style scoped>
.wrapper {
  border: none;
}
/* フォーム */
.login-form {
  padding-top: 100px;
}
.form-signin {
  max-width: 420px;
  padding: 30px 38px 66px;
  margin: auto;
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
