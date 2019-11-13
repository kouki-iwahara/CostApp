<template>
  <div>
    <!-- 検索バー -->
    <div class="sidebar_search col-sm-3 hidden-xs">
      <text-input
        class="form-control"
        :valu="value"
        :placeholder="placeholder"
        @input="updateValue"
      />
    </div>
    <div class="sidebar_list col-sm-3 hidden-xs">
      <un-ordered-list
        v-for="item in items"
        v-show="items.length"
        :key="item.id"
        class="list-group list-group-flush"
        @toFoodPage="toFoodPage(items.indexOf(item))"
      >
        <list-item class="sidebar_list_item list-group-item border-bottom">
          {{ item.name }}
        </list-item>
      </un-ordered-list>
      <div v-show="!items.length" class="no-result-message">
        <paragraph-text>
          登録がありません
        </paragraph-text>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/atoms/TextBox/TextInput'
import UnOrderedList from '~/components/atoms/List/UnOrderedList'
import ListItem from '~/components/atoms/List/ListItem'
import ParagraphText from '~/components/atoms/Text/ParagraphText'

export default {
  components: {
    TextInput,
    UnOrderedList,
    ListItem,
    ParagraphText
  },
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  },
  methods: {
    updateValue(text) {
      this.$emit('input', text)
    },
    toFoodPage(index) {
      this.$emit('toFoodPage', index)
    }
  }
}
</script>

<style scoped>
.sidebar_search,
.sidebar_list {
  display: none;
}

.sidebar_list {
  text-align: center;
}

/* 文字を丸める */
.sidebar_list_item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.no-result-message {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .sidebar_search {
    display: block;
    position: absolute;
    top: 80px;
    left: 0;
  }

  .sidebar_list {
    position: absolute;
    top: 130px;
    bottom: 15px;
    left: 0;
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .sidebar_list_item:hover {
    cursor: pointer;
    opacity: 0.5;
    -webkit-filter: brightness(0.9);
    filter: brightness(0.9);
  }
}
</style>
