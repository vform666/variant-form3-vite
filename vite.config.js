import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import externalGlobals from "rollup-plugin-external-globals"

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),

    //添加jsx/tsx支持
    vueJsx({}),

    /* 开启externalGlobals后，
       报错：TypeError: Cannot read properties of null (reading 'nodeType')，不知何故？？ */
    // externalGlobals({
    //   vue: "Vue",
    //   'element-plus': 'ElementPlus',
    // }),

    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),

  ],

  resolve: {
    alias: {
        "@": resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.vue', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },

  optimizeDeps: {
    include: ['@/../lib/vuedraggable/dist/vuedraggable.umd.js', 'quill']
  },

  css: {
    preprocessorOptions: {
      scss: {
        /* 自动引入全局scss文件 */
        additionalData: '@import "./src/styles/global.scss";'
      }
    }
  },

  build: {
    //minify: false,
    commonjsOptions: {
      exclude: [
        'lib/vuedraggable/dist/vuedraggable.umd.js,',  //引号前的逗号不能删，不知何故？？
        //'vue/dist/*.js'
      ],
      include: []
      //requireReturnsDefault: true
    },
    rollupOptions: {
      // 指定生产打包入口文件为index.htm
      input: {
        main: resolve(__dirname, 'index.html'),
      },

      // // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue', 'element-plus'],
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     vue: 'Vue', //报错：Failed to resolve module specifier "vue". Relative references must start with either
      //     'element-plus': 'ElementPlus',
      //   }
      // }
    }
  }

})
