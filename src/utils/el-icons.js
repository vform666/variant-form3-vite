import {Edit, Minus, Plus, InfoFilled, Search} from '@element-plus/icons-vue'

export function registerIcon(app) {
  app.component('el-icon-edit', Edit)
  app.component('el-icon-minus', Minus)
  app.component('el-icon-plus', Plus)
  app.component('el-icon-info', InfoFilled)
  app.component('el-icon-search', Search)
}
