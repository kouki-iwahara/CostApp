<template>
  <div>
    <un-ordered v-for="item in items" :key="item.id">
      <list-item>
        {{ item.name }}
      </list-item>
    </un-ordered>
  </div>
</template>

<script>
import UnOrdered from '~/components/atoms/List/UnOrderedList'
import ListItem from '~/components/atoms/List/ListItem'

export default {
  components: {
    UnOrdered,
    ListItem
  },
  props: {
    items: {
      type: Array,
      default: null
    }
  }
}
</script>

<style></style>
