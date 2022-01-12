<template>
  <el-form-item :label="i18nt('designer.setting.format')">
    <el-select v-model="optionModel.format" filterable allow-create>
      <el-option label="YYYY-MM-DD" value="YYYY-MM-DD"></el-option>
      <el-option label="yyyy/MM/dd" value="yyyy/MM/dd"></el-option>
      <el-option label="yyyy年MM月dd日" value="yyyy年MM月dd日"></el-option>
      <el-option label="YYYY-MM-DD HH:mm:ss" value="YYYY-MM-DD HH:mm:ss"></el-option>
      <el-option label="YYYY-MM-DD hh:mm:ss" value="YYYY-MM-DD hh:mm:ss"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "date-format-editor",
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
