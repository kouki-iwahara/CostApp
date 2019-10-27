<template>
  <div>
    <div class="content">
      <bg-image />
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
    </div>
  </div>
</template>

<script>
import BgImage from '~/components/top/BgImage.vue'

export default {
  components: {
    BgImage
  },
  computed: {
    allRecipes() {
      return this.$store.getters['recipe/allUsersRecipes']
    }
  },
  created() {
    console.log(this.$store.state.recipe.allUsersRecipes.length)
    console.log(this.allRecipes.length)
  },
  methods: {
    // クリックしたレシピのページへ遷移
    toRecipePage(index) {
      const recipe = this.$store.getters['recipe/allUsersRecipes'][index]
      console.log(recipe)
      // レシピのidを渡す
      this.$router.push({
        path: `/allRecipes?recipeId=${recipe.id}`
      })
    }
  }
}
</script>

<style scoped>
.content {
  position: static;
}
.card-columns {
  padding: 0 15px;
}
.card:hover {
  cursor: pointer;
  opacity: 0.8;
}
.test {
  width: 300px;
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
</style>
