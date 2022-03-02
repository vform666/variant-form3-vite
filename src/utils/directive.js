//import { vfApp } from '@/utils/create-app'

export function addDirective(app) {


  /**
   * 拖拽指令使用方式：v-drag="[dragDom, dragHeader]"，如 `<div v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']"></div>`
   */

  app.directive('drag', {
    mounted(el, binding) {
      if (!binding.value) return false;

      binding.instance.$nextTick(() => {
        const dragDom = document.querySelector(binding.value[0])
        const dragHeader = document.querySelector(binding.value[1])

        dragHeader.onmouseover = () => (dragHeader.style.cursor = `move`);

        function down(e, type) {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = type === 'pc' ? e.clientX - dragHeader.offsetLeft : e.touches[0].clientX - dragHeader.offsetLeft;
          const disY = type === 'pc' ? e.clientY - dragHeader.offsetTop : e.touches[0].clientY - dragHeader.offsetTop;

          // body当前宽度
          const screenWidth = document.body.clientWidth;
          // 可见区域高度(应为body高度，可某些环境下无法获取)
          const screenHeight = document.documentElement.clientHeight;

          // 对话框宽度
          const dragDomWidth = dragDom.offsetWidth;
          // 对话框高度
          const dragDomheight = dragDom.offsetHeight;

          const minDragDomLeft = dragDom.offsetLeft;
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

          const minDragDomTop = dragDom.offsetTop;
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

          // 获取到的值带px 正则匹配替换
          let styL = getComputedStyle(dragDom).left;
          let styT = getComputedStyle(dragDom).top;

          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
            styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
          } else {
            styL = +styL.replace(/\px/g, '');
            styT = +styT.replace(/\px/g, '');
          }

          return {
            disX,
            disY,
            minDragDomLeft,
            maxDragDomLeft,
            minDragDomTop,
            maxDragDomTop,
            styL,
            styT,
          };
        }

        function move(e, type, obj) {
          let { disX, disY, minDragDomLeft, maxDragDomLeft, minDragDomTop, maxDragDomTop, styL, styT } = obj;

          // 通过事件委托，计算移动的距离
          let left = type === 'pc' ? e.clientX - disX : e.touches[0].clientX - disX;
          let top = type === 'pc' ? e.clientY - disY : e.touches[0].clientY - disY;

          // 边界处理
          if (-left > minDragDomLeft) {
            left = -minDragDomLeft;
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft;
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop;
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop;
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
        }

        /**
         * pc端
         * onmousedown 鼠标按下触发事件
         * onmousemove 鼠标按下时持续触发事件
         * onmouseup 鼠标抬起触发事件
         */
        dragHeader.onmousedown = (e) => {
          const obj = down(e, 'pc');
          document.onmousemove = (e) => {
            move(e, 'pc', obj);
          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };

        /**
         * 移动端
         * ontouchstart 当按下手指时，触发ontouchstart
         * ontouchmove 当移动手指时，触发ontouchmove
         * ontouchend 当移走手指时，触发ontouchend
         */
        dragHeader.ontouchstart = (e) => {
          const obj = down(e, 'app');
          document.ontouchmove = (e) => {
            move(e, 'app', obj);
          };
          document.ontouchend = () => {
            document.ontouchmove = null;
            document.ontouchend = null;
          };
        };
      })
    },
  })

  // v-dialogDragWidth: 弹窗宽度拖大 拖小
  app.directive('dialogDragWidth', {
    mounted(el, binding) {
      binding.instance.$nextTick(() => {
        const dragDom = binding.value.$el.querySelector('.el-dialog')
        el.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - el.offsetLeft

          document.onmousemove = function(e) {
            e.preventDefault() // 移动时禁用默认事件

            // 通过事件委托，计算移动的距离
            const l = e.clientX - disX
            dragDom.style.width = `${l}px`
          }

          document.onmouseup = function(e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      })
    }
  })

}

