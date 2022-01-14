<template>
  <div>
    <el-form-item :label="i18nt('designer.setting.contentHeight')">
      <el-input type="text" v-model="optionModel.contentHeight"></el-input>
    </el-form-item>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "rich-editor-contentHeight-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
