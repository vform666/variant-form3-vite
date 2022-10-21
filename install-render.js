import axios from 'axios'

import VFormRender from '@/components/form-render/index.vue'
import ContainerItems from '@/components/form-render/container-item/index'

import {registerIcon} from '@/utils/el-icons'
import 'virtual:svg-icons-register'
import '@/iconfont/iconfont.css'

import { installI18n } from '@/utils/i18n'
import { loadExtension } from '@/extension/extension-loader'

VFormRender.install = function (app) {
  installI18n(app)
  loadExtension(app)

  app.use(ContainerItems)
  registerIcon(app)
  app.component(VFormRender.name, VFormRender)
}

const components = [
  VFormRender
]

const install = (app) => {
  installI18n(app)
  loadExtension(app)

  app.use(ContainerItems)
  registerIcon(app)
  components.forEach(component => {
    app.component(component.name, component)
  })

  window.axios = axios
}

if (typeof window !== 'undefined' && window.Vue) { /* script方式引入时赋值axios！！ */
  //window.axios = axios
}

export default {
  install,
  VFormRender
}
