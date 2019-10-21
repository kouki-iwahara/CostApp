<template>
  <div class="comment-form">
    <label for="comment">コメント</label>
    <slot
      ><textarea
        id="comment"
        :value="value"
        class="form-control"
        rows="6"
        maxlength="255"
        placeholder="注意点や課題など(255文字)"
        @input="updateValue"
      />
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style></style>
