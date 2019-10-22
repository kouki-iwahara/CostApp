<template>
  <div class="bg-image">
    <div class="bg-mask container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <div class="service-message text-dark">
            <div class="service-message_title">
              <strong>
                食材やレシピを登録
              </strong>
            </div>
            <div class="service-message_title">
              <strong>
                利益と原価管理、レシピ制作支援サービス
              </strong>
            </div>
            <div class="service-message_count">
              <p>
                現在
                <strong>
                  {{ recipeCount }}
                </strong>
                個のレシピを公開中
              </p>
            </div>
            <button
              v-if="isLogin"
              type="button"
              class="btn btn-orange btn-lg"
              @click="toRecipeList"
            >
              公開中のレシピ一覧
            </button>
            <button
              v-else
              type="button"
              class="btn btn-orange btn-lg"
              @click="toSignUp"
            >
              新規登録（無料）
            </button>
            <nuxt-link v-show="!isLogin" to="/recipeList" class="nav-link">
              公開中のレシピ一覧
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: this.$store.getters['user/user'],
      recipeCount: this.$store.getters['recipe/allUsersRecipes'].length
    }
  },
  methods: {
    toSignUp() {
      this.$router.push('/signup')
    },
    toRecipeList() {
      this.$router.push('/recipeList')
    }
  }
}
</script>

<style scoped>
.bg-mask {
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
}
.bg-image {
  height: 400px;
  position: relative;
  margin: 0px 15px 20px;
  background-image: url(../../assets/image/bg-image.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.service-message {
  text-align: center;
  font-size: 1.3em;
  position: absolute;
  top: 100px;
}
.service-message_title {
  margin-bottom: 16px;
}
.btn-orange {
  padding: 8px 24px;
  margin-bottom: 5px;
  background: #fc4a1a;
  background: linear-gradient(to right, #f7b733, #fc4a1a);
  color: #fff;
  border: 3px solid rgb(228, 163, 106);
}
.btn-orange:hover {
  opacity: 0.8;
}
.nav-link {
  color: darkslategray;
  font-size: 0.8em;
  width: 200px;
  margin: 0 auto;
}
.nav-link:hover {
  text-decoration: underline;
}
</style>
