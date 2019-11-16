<template>
  <normal-image :image="image">
    <div slot="input-file" class="input-group input-group-sm">
      <div class="content_image_file custom-file">
        <file-input @getFileData="getFileData" />
      </div>
    </div>
  </normal-image>
</template>

<script>
import NormalImage from '~/components/atoms/Image/NormalImage'
import FileInput from '~/components/atoms/File/FileInput'

export default {
  components: {
    NormalImage,
    FileInput
  },
  props: {
    image: {
      type: [Object, String],
      required: true
    }
  },
  methods: {
    getFileData(file) {
      console.log(file)
      this.$emit('getFileData', file)
    }
  }
}
</script>

<style></style>
