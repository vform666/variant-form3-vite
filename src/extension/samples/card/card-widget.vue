<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList">
    <el-card :key="widget.id" class="card-container" @click.stop="selectWidget(widget)"
             :shadow="widget.options.shadow" :style="{width: widget.options.cardWidth + '!important' || ''}"
             :class="[selected ? 'selected' : '', !!widget.options.folded ? 'folded' : '', customClass]">
      <template #header>
        <div class="clear-fix">
          <span>{{widget.options.label}}</span>
          <i v-if="widget.options.showFold" class="float-right" @click="toggleCard">
            <template v-if="!widget.options.folded">
              <el-icon><ArrowDown /></el-icon>
            </template>
            <template v-else>
              <el-icon><ArrowUp /></el-icon>
            </template>
          </i>
        </div>
      </template>
      <draggable :list="widget.widgetList" item-key="id" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 200}"
                 handle=".drag-handler" tag="transition-group" :component-data="{name: 'fade'}"
                 @add="(evt) => onContainerDragAdd(evt, widget.widgetList)"
                 @update="onContainerDragUpdate" :move="checkContainerMove">
        <template #item="{ element: subWidget, index: swIdx }">
          <div class="form-widget-list">
            <template v-if="'container' === subWidget.category">
              <component :is="subWidget.type + '-widget'" :widget="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList"
                         :index-of-parent-list="swIdx" :parent-widget="widget"></component>
            </template>
            <template v-else>
              <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList"
                         :index-of-parent-list="swIdx" :parent-widget="widget" :design-state="true"></component>
            </template>
          </div>
        </template>
      </draggable>
    </el-card>
  </container-wrapper>
</template>

<script>
  import i18n from "@/utils/i18n"
  import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
  import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'
  import refMixinDesign from "@/components/form-designer/refMixinDesign"
  import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

  export default {
    name: "card-widget",
    componentName: 'ContainerWidget',
    mixins: [i18n, containerMixin, refMixinDesign],
    inject: ['refList'],
    components: {
      ContainerWrapper,
      ...FieldComponents,
      ArrowDown,
      ArrowUp
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,
    },
    computed: {
      selected() {
        return this.widget.id === this.designer.selectedId
      },

      customClass() {
        return this.widget.options.customClass || ''
      },

    },
    created() {
      this.initRefList()
    },
    methods: {
      /**
       * 检查接收哪些组件拖放，如不接受某些组件拖放，则根据组件类型判断后返回false
       * @param evt
       * @returns {boolean}
       */
      checkContainerMove(evt) {
        return true
      },

      toggleCard() {
        this.widget.options.folded = !this.widget.options.folded
      },

      /**
       * 设置折叠/打开状态
       * @param folded
       */
      setFolded(folded) {
        this.widget.options.folded = !!folded
      }

    }
  }
</script>

<style lang="scss" scoped>
  .card-container.selected {
    outline: 2px solid $--color-primary !important;
  }

  .card-container {
    margin: 3px;

    .form-widget-list {
      min-height: 28px;
    }
  }

  :deep(.el-card__header) {
    padding: 10px 12px;
  }

  .folded :deep(.el-card__body) {
    display: none;
  }

  .clear-fix:before, .clear-fix:after {
    display: table;
    content: "";
  }

  .clear-fix:after {
    clear: both;
  }

  .float-right {
    float: right;
  }

</style>
