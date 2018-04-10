### CSS盒模型
#### 基本概念
基本模型+IE模型  
1. 基本模型的宽高：只包括content（即内容），不包括padding和border。  
2. IE模型的宽高：包括padding和border。
#### 如何设置这两种类型
1. box-sizing: content-box (基本模型)
2. box-sizing: border-box (IE模型)
#### 如何获取盒模型对应的宽和高
1. dom.style.width/height(只能取到内样式的宽和高)
2. dom.currentStyle.width/height(取到渲染后的宽和高)(只有IE支持)
3. window.getComputedStyle(dom).width/height(取到渲染后的宽和高)(火狐谷歌支持)
4. dom.getBoundingClientRect().width/height (会得到元素的top、right、bottom、left、width、height属性)
#### BFC
解决边距重叠，可看https://zhuanlan.zhihu.com/p/25321647
1. 基本概念：块级格式化上下文
2. 如何创建BFC：
    * body 根元素
    * 浮动元素：float 除 none 以外的值
    * 绝对定位元素：position (absolute、fixed)
    * display 为 inline-block、table-cells、flex
    * overflow 除了 visible 以外的值 (hidden、auto、scroll)