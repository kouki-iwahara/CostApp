<template>
  <div class="container">
    <div class="wrapper">
      <div class="login-form row">
        <div class="col-sm-12">
          <div class="form-signin">
            <h3 class="form-signin-heading">Sign Up</h3>

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
              class="btn btn-lg btn-outline-info btn-block"
              @click="signup"
            >
              Sign Up
            </button>
            <div class="nav">
              <nuxt-link to="/signIn" class="nav-link">
                Signin
              </nuxt-link>
              <nuxt-link to="/" class="nav-link">
                Home
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import querystring from 'querystring'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signup() {
      const req = {
        email: this.email,
        password: this.password
      }
      this.$axios
        .$post('/signup', querystring.stringify(req))
        .then((res) => {
          alert(res.message)
          if (res.message === '登録完了です') {
            this.$router.push({ path: '/signin' })
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
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
  margin: 0 auto;
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
