<template>
  <el-form-item :label="i18nt('designer.setting.autoFullWidth')">
    <el-switch v-model="optionModel.autoFullWidth"></el-switch>
  </el-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "autoFullWidth-editor",
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
