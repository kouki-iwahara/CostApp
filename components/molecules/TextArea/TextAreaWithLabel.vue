<template>
  <div>
    <input-label>
      <strong slot="label-name">コメント</strong>
    </input-label>
    <text-area :value="value" @input="updateValue" />
  </div>
</template>

<script>
import InputLabel from '~/components/atoms/Label/InputLabel'
import TextArea from '~/components/atoms/TextArea/TextArea'

export default {
  components: {
    InputLabel,
    TextArea
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue(text) {
      this.$emit('input', text)
    }
  }
}
</script>

<style></style>
