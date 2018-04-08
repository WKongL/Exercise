### dom事件
####DOM事件模型
1. 捕获
2. 冒泡

####DOM事件级别
1. DOM0: element.onclick=function(){}
2. DOM2: element.addEventListener('click',function(){},false) true-捕获事件触发 false-冒泡事件触发
3. DOM3: element.addEventListener('keyup',function(),false)

####事件流
点击左键后怎么传到页面上：捕获->目标阶段->冒泡
1. 捕获的具体流程: window->documnet->html->body->....->目标元素
1. 冒泡的具体流程: 目标元素->....->body->html->document->window

####Event对象常见应用
1. event.preventDefault() 阻止事件默认行为
2. event.stopPropagation() 阻止冒泡
3. event.stopImmediatePropagation() 一个按钮注册A,B两个时间，A时间加上这个，则不会执行到B事件。（默认不加A,B事件都会执行）
4. event.currentTarget 当前绑定事件的元素
5. event.target 当前被点击的元素（早期的IE event.srcElement ）

####自定义时间
``` javascript
var eve = new Event('custome');
ev.addEventListener('custome',function(){
    console.log('custome');
});
ev.dispatchEvent(eve);
```