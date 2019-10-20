<template>
  <div>
    <div class="card-header">
      <b-navbar class="header navbar" toggleable="md">
        <b-navbar-nav class="nav-list_item">
          <ul class="navbar-nav nav-tabs">
            <!-- アクティブつけたい -->
            <li class="nav-item">
              <nuxt-link
                to="/home/food"
                :class="{ active: isFoodActive }"
                class="nav-link"
              >
                食材一覧
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/home/recipe"
                :class="{ active: isRecipeActive }"
                class="nav-link"
              >
                レシピ一覧
              </nuxt-link>
            </li>
          </ul>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="card-body">
      登録されていません的な
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isFoodActive: {
      type: Boolean
    },
    isRecipeActive: {
      type: Boolean
    }
  }
}
</script>

<style></style>
