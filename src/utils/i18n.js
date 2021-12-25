import { createI18n } from 'vue-i18n'		//引入vue-i18n组件
//import { vfApp } from '@/utils/create-app'

import enLocaleElement from "element-plus/lib/locale/lang/en";
import zhLocaleElement from "element-plus/lib/locale/lang/zh-cn";
//import locale from "element-plus/lib/locale"

import enLocale from "@/lang/en-US";
import zhLocale from "@/lang/zh-CN";
import enLocale_render from "@/lang/en-US_render";
import zhLocale_render from "@/lang/zh-CN_render";
import enLocale_extension from "@/lang/en-US_extension";
import zhLocale_extension from "@/lang/zh-CN_extension";

const langResources = {
  'en-US': {
    something: {
      //...
    },
    ...enLocaleElement,
    ...enLocale,
    ...enLocale_render,
    ...enLocale_extension
  },

  'zh-CN': {
    something: {
      //...
    },
    ...zhLocaleElement,
    ...zhLocale,
    ...zhLocale_render,
    ...zhLocale_extension
  }
}

//locale.i18n((key, value) => i18n.t(key, value))

export const changeLocale = function(langName) {
  i18n.locale = langName
  localStorage.setItem('v_form_locale', langName)
}

export const translate = function(key) {
  return i18n.global.t(key, i18n.locale)

  //return key
}

const i18n = createI18n({
  locale: localStorage.getItem('v_form_locale') || 'zh-CN',
  messages: langResources
})
//vfApp.use(i18n);

export const installI18n = (app) => {
  app.use(i18n)
}

export default {
  methods: {
    i18nt(key) {
      return i18n.global.t(key, i18n.locale)

      //return key
    },

    /* 如果key1不存在，则查找key2 */
    i18n2t(key1, key2) {
      return i18n.global.te(key1, i18n.locale) ? i18n.global.t(key1, i18n.locale) : i18n.global.t(key2, i18n.locale)

      //return key1
    },

  }
}
