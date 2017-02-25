# todolist

> 一个简单的Vue.js应用，这个分支是master的vue单文件版本，实现排序,删除,添加item的功能及其过渡效果
>同时具有**markdown**编辑器功能
>[在线体验](https://imgss.github.io/demo/statictodo/index.html)

***

## 说明

文件夹中`src`是用`vuex`实现视图切换，`src-动态组件`是通过`vue`的动态组件实现视图切换，这里应该用动态组件更合适
## 更新记录

* 某天，简单适配移动端。

* 2017.1.3 应用`vue-resoure`的`jsonp`请求天气，实现可折叠天气组件。:blush:

* 2017.2.14 视图界面小优化，尽管界面依然很丑，初次使用vue-router,添加`/write`路由 :smile:

* 2017.2.16 加入markdown编辑器

* 2017.2.17 markdown编辑器可以保存markdown字符串，路由切换字符串不丢失。

* 2017.2.22 切换到list选项时自动保存`md`字符，不需要点保存按钮。

* 2017.2.25 动态组件来切换视图

##截图

1. todolist截图
>![](https://github.com/imgss/ToDoList/blob/todolist-vuex/snip/pc.PNG "pc截图")  

2. todolist美化截图*毕竟不是设计师*
>![](https://github.com/imgss/ToDoList/blob/todolist-vuex/snip/pc2.0.PNG "pc截图")

3. 手机截图
><img src="https://github.com/imgss/ToDoList/blob/todolist-vuex/snip/phone.png" alt="手机截图" width="360px"> 
   
4. markdown编辑界面截图
>![](https://github.com/imgss/ToDoList/blob/todolist-vuex/snip/markdown.PNG "markdown编辑界面截图") 

## 运行这个应用

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```