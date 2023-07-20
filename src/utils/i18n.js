import { createI18n } from './smart-vue-i18n/index'

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
    ...enLocale,
    ...enLocale_render,
    ...enLocale_extension
  },

  'zh-CN': {
    something: {
      //...
    },
    ...zhLocale,
    ...zhLocale_render,
    ...zhLocale_extension
  }
}

const i18n = createI18n({
  locale: localStorage.getItem('v_form_locale') || 'zh-CN',
  messages: langResources
})

export const changeLocale = function(langName) {
  i18n.setLang(langName)
  localStorage.setItem('v_form_locale', langName)
}

export const translate = function(key) {
  return i18n.$st(key)
}

export const installI18n = (app) => {
  //
}

export default {
  methods: {
    i18nt(key) {
      return i18n.$st(key)
    },

    /* 如果key1不存在，则查找key2 */
    i18n2t(key1, key2) {
      return i18n.$st2(key1, key2)
    },

  }
}
