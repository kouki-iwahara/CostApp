<template>
  <div class="container">
    <div class="wrapper">
      <div class="login-form row d-flex align-items-center">
        <div class="col-sm-12">
          <form action="/signin" method="post" class="form-signin">
            <h3 class="form-signin-heading">Sign In</h3>

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
              class="btn btn-lg btn-outline-info btn-block"
              name="Submit"
              value="Login"
              type="button"
              @click="signIn"
            >
              Sign In
            </button>
            <div class="nav">
              <nuxt-link to="/signUp" class="nav-link">
                SignUp
              </nuxt-link>
              <nuxt-link to="/" class="nav-link">
                Home
              </nuxt-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        return this.$router.push('/')
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

.form-signin {
  max-width: 420px;
  padding: 30px 38px 66px;
  margin: auto;
  background-color: #f4f5f7;
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
</style>
