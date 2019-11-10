<template>
  <nav aria-label="パンくずリスト">
    <ol class="breadcrumb">
      <list-item class="breadcrumb-item">
        <nuxt-link :to="link" class="nav-link">
          <slot name="link-name" />
        </nuxt-link>
      </list-item>

      <list-item class="breadcrumb-item active" aria-current="page">
        {{ listName }}
      </list-item>
    </ol>
  </nav>
</template>

<script>
import ListItem from '~/components/atoms/List/ListItem'

export default {
  components: {
    ListItem
  },
  props: {
    link: {
      type: String,
      default: null
    },
    listName: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  padding: 6px 12px;
}

.nav-link {
  padding: 0;
}
</style>
