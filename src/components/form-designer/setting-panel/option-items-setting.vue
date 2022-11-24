<template>
  <div class="option-items-pane">
    <el-radio-group v-if="(selectedWidget.type === 'radio') || ((selectedWidget.type === 'select') && !selectedWidget.options.multiple)"
                    v-model="optionModel.defaultValue" @change="emitDefaultValueChange">
      <draggable tag="ul" :list="optionModel.optionItems" item-key="id"
                 v-bind="{group:'optionsGroup', ghostClass: 'ghost', handle: '.drag-option'}">
        <template #item="{ element: option, index: idx }">
          <li>
            <el-radio :label="option.value">
              <el-input v-model="option.value" size="small" style="width: 100px"></el-input>
              <el-input v-model="option.label" size="small" style="width: 100px"></el-input>
              <i class="iconfont icon-drag drag-option"></i>
              <el-button circle plain size="small" type="danger" @click="deleteOption(option, idx)"
                         icon="el-icon-minus" class="col-delete-button"></el-button>
            </el-radio>
          </li>
        </template>
      </draggable>
    </el-radio-group>
    <el-checkbox-group v-else-if="(selectedWidget.type === 'checkbox') || ((selectedWidget.type === 'select') && selectedWidget.options.multiple)"
                    v-model="optionModel.defaultValue" @change="emitDefaultValueChange">
      <draggable tag="ul" :list="optionModel.optionItems" item-key="id"
                 v-bind="{group:'optionsGroup', ghostClass: 'ghost', handle: '.drag-option'}">
        <template #item="{ element: option, index: idx }">
          <li>
            <el-checkbox :label="option.value">
              <el-input v-model="option.value" size="small" style="width: 100px"></el-input>
              <el-input v-model="option.label" size="small" style="width: 100px"></el-input>
              <i class="iconfont icon-drag drag-option"></i>
              <el-button circle plain size="small" type="danger" @click="deleteOption(option, idx)"
                         icon="el-icon-minus" class="col-delete-button"></el-button>
            </el-checkbox>
          </li>
        </template>
      </draggable>
    </el-checkbox-group>
    <div v-else-if="(selectedWidget.type === 'cascader')" class="full-width-input">
      <el-cascader v-model="optionModel.defaultValue" :options="optionModel.optionItems"
                   @change="emitDefaultValueChange"
                   :placeholder="i18nt('render.hint.selectPlaceholder')">
      </el-cascader>
    </div>
    <div v-if="(selectedWidget.type === 'cascader')">
      <el-button link type="primary" @click="importCascaderOptions">{{i18nt('designer.setting.importOptions')}}</el-button>
      <el-button link type="primary" @click="resetDefault">{{i18nt('designer.setting.resetDefault')}}</el-button>
    </div>

    <div v-if="(selectedWidget.type === 'radio') || (selectedWidget.type === 'checkbox') || (selectedWidget.type === 'select')">
      <el-button link type="primary" @click="addOption">{{i18nt('designer.setting.addOption')}}</el-button>
      <el-button link type="primary" @click="importOptions">{{i18nt('designer.setting.importOptions')}}</el-button>
      <el-button link type="primary" @click="resetDefault">{{i18nt('designer.setting.resetDefault')}}</el-button>
    </div>

    <div v-if="showImportDialogFlag" class="" v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']">
      <el-dialog :title="i18nt('designer.setting.importOptions')" v-model="showImportDialogFlag"
                 :show-close="true" class="drag-dialog small-padding-dialog" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <el-form-item>
          <el-input type="textarea" rows="10" v-model="optionLines"></el-input>
        </el-form-item>
        <template #footer>
          <div class="dialog-footer">
            <el-button size="large" type="primary" @click="saveOptions">{{i18nt('designer.hint.confirm')}}</el-button>
            <el-button size="large" @click="showImportDialogFlag = false">{{i18nt('designer.hint.cancel')}}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <div v-if="showImportCascaderDialogFlag" class="" v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']">
      <el-dialog :title="i18nt('designer.setting.importOptions')" v-model="showImportCascaderDialogFlag"
                 :show-close="true" class="drag-dialog small-padding-dialog" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <code-editor v-model="cascaderOptions" mode="json" :readonly="false"></code-editor>
        <template #footer>
          <div class="dialog-footer">
            <el-button size="large" type="primary" @click="saveCascaderOptions">{{i18nt('designer.hint.confirm')}}</el-button>
            <el-button size="large" @click="showImportCascaderDialogFlag = false">{{i18nt('designer.hint.cancel')}}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import CodeEditor from '@/components/code-editor/index'
  import i18n from "@/utils/i18n";

  export default {
    name: "OptionItemsSetting",
    mixins: [i18n],
    components: {
      CodeEditor,
    },
    props: {
      designer: Object,
      selectedWidget: Object,
    },
    data() {
      return {
        showImportDialogFlag: false,
        optionLines: '',

        cascaderOptions: '',
        showImportCascaderDialogFlag: false,

        //separator: '||',
        separator: ',',
      }
    },
    computed: {
      optionModel() {
        return this.selectedWidget.options
      },

    },
    watch: {
      'selectedWidget.options': {
        deep: true,
        handler(val) {
          //console.log('888888', 'Options change!')
        }
      },
    },
    methods: {
      emitDefaultValueChange() {
        if (!!this.designer && !!this.designer.formWidget) {
          let fieldWidget = this.designer.formWidget.getWidgetRef(this.selectedWidget.options.name)
          if (!!fieldWidget && !!fieldWidget.refreshDefaultValue) {
            fieldWidget.refreshDefaultValue()
          }
        }
      },

      deleteOption(option, index) {
        this.optionModel.optionItems.splice(index, 1)
      },

      addOption() {
        let newValue = this.optionModel.optionItems.length + 1
        this.optionModel.optionItems.push({
          value: newValue,
          label: 'new option'
        })
      },

      importOptions() {
        this.optionLines = ''
        if (this.optionModel.optionItems.length > 0) {
          this.optionModel.optionItems.forEach((opt) => {
            if (opt.value === opt.label) {
              this.optionLines += opt.value + '\n'
            } else {
              this.optionLines += opt.value + this.separator + opt.label + '\n'
            }
          })
        }

        this.showImportDialogFlag = true
      },

      saveOptions() {
        let lineArray = this.optionLines.split('\n')
        //console.log('test', lineArray)
        if (lineArray.length > 0) {
          this.optionModel.optionItems = []
          lineArray.forEach((optLine) => {
            if (!!optLine && !!optLine.trim()) {
              if (optLine.indexOf(this.separator) !== -1) {
                this.optionModel.optionItems.push({
                  value: optLine.split(this.separator)[0],
                  label: optLine.split(this.separator)[1]
                })
              } else {
                this.optionModel.optionItems.push({
                  value: optLine,
                  label: optLine
                })
              }
            }
          })
        } else {
          this.optionModel.optionItems = []
        }

        this.showImportDialogFlag = false
      },

      resetDefault() {
        if ((this.selectedWidget.type === 'checkbox') ||
            ((this.selectedWidget.type === 'select') && this.selectedWidget.options.multiple)) {
          this.optionModel.defaultValue = []
        } else {
          this.optionModel.defaultValue = ''
        }

        this.emitDefaultValueChange()
      },

      importCascaderOptions() {
        this.cascaderOptions = JSON.stringify(this.optionModel.optionItems, null, '  ')
        this.showImportCascaderDialogFlag = true
      },

      saveCascaderOptions() {
        try {
          let newOptions = JSON.parse(this.cascaderOptions)
          this.optionModel.optionItems = newOptions
          //TODO: 是否需要重置选项默认值？？

          this.showImportCascaderDialogFlag = false
        } catch (ex) {
          this.$message.error(this.i18nt('designer.hint.invalidOptionsData') + ex.message)
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .option-items-pane {
    width: 100%;

    ul {
      padding-inline-start: 6px;
      padding-left: 6px; /* 重置IE11默认样式 */
    }
  }

  li.ghost{
    background: #fff;
    border: 2px dotted $--color-primary;
  }

  .drag-option {
    cursor: move;
  }

  .small-padding-dialog :deep(.el-dialog__body) {
    padding: 10px 15px;
  }

  .dialog-footer .el-button {
    width: 100px;
  }

  .full-width-input {
    width: 100% !important;

    :deep(.el-cascader) {
      width: 100% !important;
    }
  }

</style>
