/**
 * Created by gg on 2016/12/4.
 */
Vue.component('todoitem',{
    data:function(){
        return {
            danger:['fa-thermometer-quarter',
                    'fa-thermometer-half',
                    'fa-thermometer-three-quarters',
                    'fa-thermometer-full']//匹配重要程度icon 图标

        }
    },
    props:['todo'],
    template:'<li class="section" v-bind:class="{ finished: todo.isFinished }">\
                    <div>\
                        <i class="fa fa-3x" :class="ji"  title="紧急程度"></i>\
                    </div>\
                        <div class="item">\
                            <div class="big" >{{todo.value.toUpperCase().charAt(0)}}</div>\
                            <div>\
                                <div>待完成：{{todo.value}}</div>\
                                <div>完成状态：{{todo.isFinished?"已完成":"未完成"}}</div>\
                                <div>截止时间：{{todo.deadline}}</div>\
                                <div class="tips">备注：{{todo.tips}}</div>\
                            </div>\
                        </div>\
                    <div>\
                        <i class="fa fa-check-square fa-2x" title="完成" @click="finished"></i>\
                        <i class="fa fa-times-circle fa-2x" title="删除" @click="removeItem"></i>\
                    </div>\
                </li>',
    computed:{
        ji:function(){
            var em=this.danger[this.todo.isImportant],obj={};
            obj[em]=true;
            return obj;
            }
    },
    methods:{
        finished:function(){//完成按钮处理函数，点击完成后改变状态
            this.todo.isFinished=!this.todo.isFinished;
        },
        removeItem:function(){
            if(!this.todo.isFinished){
                return false;
            }
            var todoList=showItem.todos;
            todoList.splice(todoList.indexOf(this.todo),1);
        }
    }

});
var addItem=new Vue({//增加一条项目
    el:'#add',
    data:{
        show:false,
        alert:'',
        newToDo:{
            isImportant:0,
            isFinished:false,
            value:'',
            tips:'',
            deadline:'',
            timeStamp:'',
            show:true
        }
    },
    methods:{
        copyObj:function(old){//向组件传递数据时，复制对象
            if (Object.assign){
                return Object.assign({},old);
            }
            var nObj={},prop;
            for(prop in old){
                if(old.hasOwnProperty(prop)){
                    nObj[prop]=old[prop];
                }
            }
            return nObj;
        },
        submit:function(){
            if(!this.newToDo.value || !this.newToDo.deadline){//必须填写截止时间
                this.alert='请不要漏填事情或者截止时间';
                return false;
            }
            this.newToDo.isImportant=parseInt(this.newToDo.isImportant);//接受到的isImportant是字符串，转换为数字
            this.newToDo.timeStamp=(new Date()).toTimeString();//增加时间戳
            var copy=this.copyObj(this.newToDo);
            //showItem.todos.push(this.newToDo);//这样只会传递引用
            showItem.todos.push(copy);//showItem.todos[length]=copy不会触发视图更新？？
            console.log(showItem.todos.length);

        }
    }
});
var showItem=new Vue({
    el:'#todolist',
    data:{
        todos:[
                {
                    isImportant:1,
                    isFinished:false,
                    value:'洗衣服',
                    tips:'不洗完不睡觉',
                    deadline:'14:00',
                    show:true
                },
                {
                    isImportant:2,
                    isFinished:false,
                    value:'做demo',
                    tips:'',
                    deadline:'16:00',
                    show:true
                },
                {
                    isImportant:3,
                    isFinished:false,
                    value:'去拍照',
                    tips:'',
                    deadline:'18:00',
                    show:true
                }
            ],
        todosCopy:null,
        onlyUnfinish:false
        },
    computed:{
        countTodos:function(){
            return this.todos.length;
        },
        countFinishedItems:function(){
            var count=0;
            this.todos.forEach(function(t,index){
                if(t.isFinished){
                    count++;
                }
            });
            return count;
        }
    },
    methods: {
        listByProp: function (prop) {
            console.log(prop);
            if (this.todosCopy) {
                this.todos = this.todosCopy;
            }
            this.todos.sort(function (self, next) {
                return next[prop] - self[prop];
            });
        },
        listByDeadline: function () {//按截止日期排序
            var todos = this.todos;
            if (this.todosCopy) {
                this.todos = this.todosCopy;
            }
            this.todos.sort(function (self, next) {
                var numSelf = parseFloat(self.deadline.replace(/:/, '.'));
                var numNext = parseFloat(next.deadline.replace(/:/, '.'));
                return numNext - numSelf;
            });

        },
        onlyUnfinished: function () {
            this.onlyUnfinish = !this.onlyUnfinish;//状态切换
            if (this.onlyUnfinish) {
                this.todos.forEach(function (item) {
                    if (item.isFinished) {
                        item.show = false;
                    }
                });
            }
            else {
                this.todos.forEach(function (item) {
                    item.show = true;
                });
            }
        }
    }
});