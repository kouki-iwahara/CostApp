<template>
  <div>
    <div class="content">
      <bg-image />
      <div class="search-bar col-sm-6">
        <search-bar v-model="searchText" placeholder="レシピ名を検索" />
      </div>
      <div class="card-columns">
        <div
          v-for="recipe in allRecipes"
          :key="recipe.id"
          class="card"
          @click="toRecipePage(allRecipes.indexOf(recipe))"
        >
          <img class="card-img-top" :src="recipe.image" alt="カード1の画像" />
          <div class="card-body">
            <h5 class="card-title">{{ recipe.name }}</h5>
            <p class="card-text">
              {{ recipe.comment }}
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">
              {{ `最終更新 ${recipe.updatedAt.substring(0, 10)}` }}
            </small>
          </div>
        </div>
      </div>
      <div v-show="!allRecipes.length" class="no-result-message">
        <p>登録がありません</p>
      </div>
    </div>
  </div>
</template>

<script>
import BgImage from '~/components/top/BgImage.vue'
import searchBar from '~/components/common/searchBar.vue'

export default {
  components: {
    BgImage,
    searchBar
  },
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    allRecipes() {
      const filterRecipes = []
      const recipes = this.$store.getters['recipe/allUsersRecipes']
      if (!this.searchText) {
        return recipes
      }
      // 検索のテキストを含む名前を表示する
      recipes.forEach((recipe) => {
        if (recipe.name.includes(this.searchText)) {
          filterRecipes.push(recipe)
        }
      })
      return filterRecipes
    }
  },
  created() {
    console.log(this.$store.state.recipe.allUsersRecipes.length)
    console.log(this.allRecipes.length)
  },
  methods: {
    // クリックしたレシピのページへ遷移
    toRecipePage(index) {
      const recipe = this.allRecipes[index]
      console.log(recipe)
      // レシピのidを渡す
      this.$router.push({
        path: `/recipe/${recipe.id}`
      })
    }
  }
}
</script>

<style scoped>
.content {
  position: static;
}

.search-bar {
  margin: 0 auto 30px;
}

.card-columns {
  padding: 0 15px;
}

.card:hover {
  cursor: pointer;
  opacity: 0.8;
}

.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.no-result-message {
  text-align: center;
  height: 40vh;
  margin: 30px auto;
}
</style>
