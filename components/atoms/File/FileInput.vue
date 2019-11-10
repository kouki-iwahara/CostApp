<template>
  <div>
    <input
      id="inputGroupFile"
      type="file"
      class="custom-file-input"
      @input="getFileData"
    />
    <label
      class="custom-file-label"
      for="inputGroupFile"
      data-browse="ファイルを選択"
      >ファイル選択...</label
    >
  </div>
</template>

<script>
export default {
  methods: {
    getFileData(e) {
      const file = e.target.files[0]
      this.$emit('getFileData', file)
    }
  }
}
</script>

<style></style>
