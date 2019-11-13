<template>
  <div>
    <b-button
      v-b-modal.modal-scrollable
      class="add-btn btn-success"
      @click="initializeText"
      >食材を選択</b-button
    >

    <b-modal id="modal-scrollable" ref="foodModal" scrollable>
      <header slot="modal-header" class="col-sm-12">
        <text-input v-model="searchText" placeholder="食材名を検索" />
      </header>
      <ul
        v-for="food in foods"
        v-show="foods.length"
        :key="food.id"
        class="list-group list-group-flush"
        @click="showSelectedFood(foods.indexOf(food))"
      >
        <list-item class="list-item list-group-item border-bottom">
          {{ food.name }}
        </list-item>
      </ul>
      <div v-show="!foods.length" class="no-result-message">
        <paragraph-text>
          登録がありません
        </paragraph-text>
      </div>

      <footer slot="modal-footer">
        <!-- クリックされたらモーダルを閉じる関数を呼ぶ -->
        <b-button class="btn-secondry" @click="closeModal">
          閉じる
        </b-button>
      </footer>
    </b-modal>
  </div>
</template>

<script>
import TextInput from '~/components/atoms/TextBox/TextInput'
// import UnOrderedList from '~/components/atoms/List/UnOrderedList'
import ListItem from '~/components/atoms/List/ListItem'
import ParagraphText from '~/components/atoms/Text/ParagraphText'

export default {
  components: {
    TextInput,
    // UnOrderedList,
    ListItem,
    ParagraphText
  },
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    // 全ての食材
    foods() {
      const filterFoods = []
      const foods = this.$store.getters['food/foods'].slice()
      if (!this.searchText) {
        return foods
      }
      foods.forEach((food) => {
        if (food.name.includes(this.searchText)) {
          filterFoods.push(food)
        }
      })
      return filterFoods
    }
  },
  methods: {
    showSelectedFood(index) {
      const food = this.foods[index]
      this.$emit('showSelectedFood', food)
    },
    openModal() {
      this.$refs.foodModal.show()
    },
    closeModal() {
      this.$refs.foodModal.hide()
    },
    initializeText() {
      this.searchText = ''
    }
  }
}
</script>

<style scoped>
.add-btn {
  margin-top: 13px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.25em;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}
.close-btn {
  background-color: red;
}

.list-item:hover {
  cursor: pointer;
  opacity: 0.5;
  -webkit-filter: brightness(0.9);
  filter: brightness(0.9);
}
</style>
