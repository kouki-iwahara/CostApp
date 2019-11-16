<template>
  <div>
    <input
      id="inputGroupFile"
      type="file"
      class="custom-file-input"
      accept="image/*"
      @change="getFileData"
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
      const file = e.srcElement.files[0]
      console.log(file)
      this.$emit('getFileData', file)
    }
  }
}
</script>

<style></style>
