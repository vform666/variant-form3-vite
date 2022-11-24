import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import visualizer from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    //添加jsx/tsx支持
    vueJsx({}),

    //解决引入commonjs模块后打包出现的{'default' is not exported by XXX}错误!!
    commonjs({requireReturnsDefault: true}),  /* 配置requireReturnsDefault属性，
    解决打包后引入VForm出现的"Axios is not a constructor"错！！ */

    //可视化Bundle
    visualizer(),

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
    //include: ['quill']
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
    //minify: false, //
    lib: {
      entry: resolve(__dirname, 'install-render.js'),
      name: 'VFormRender',
      fileName: (format) => `render.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        exports: 'default',  //要支持CDN引入必须设置此参数！！！
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
        assetFileNames: `render.style.css`
      }
    }
  }

})
