<template>
<li class="section list-item" v-bind:class="{ finished: todo.isFinished }">
                  <div>
                      <i class="fa fa-3x" :class="ji"  title="紧急程度"></i>
                  </div>
                      <div class="item">
                          <div class="big" >{{todo.value.toUpperCase().charAt(0)}}</div>
                          <div>
                              <div><span>待完成：</span><span class='detail'>{{todo.value}}</span></div>
                              <div><span>完成状态：</span><span>{{todo.isFinished?"已完成":"未完成"}}</span></div>
                              <div><span>截止时间：</span><span>{{todo.deadline}}</span></div>
                              <div class="tips"><span>备注：</span><span>{{todo.tips}}</span></div>
                          </div>
                      </div>
                  <div>
                      <i class="fa fa-check-square fa-2x fa-fw" title="完成" v-if="!this.todo.isFinished" @click="finished"></i>
                      <i class="fa fa-check-square-o fa-2x fa-fw" title="完成" style='color:#f36' v-else @click="finished"></i>
                      <i class="fa fa-times-circle fa-2x fa-fw" title="删除" @click="remove"></i>
                  </div>
              </li>
 </template>

<script>
    export default {
        data: function() {
            return {
                danger: ['fa-thermometer-quarter',
                        'fa-thermometer-half',
                        'fa-thermometer-three-quarters',
                        'fa-thermometer-full'
                    ] //匹配重要程度icon 图标
            }
        },
        props: ['todo', 'index'],

        computed: {
            ji: function() { //重要程度的动态class
                var em = this.danger[this.todo.isImportant],
                    obj = {};
                obj[em] = true;
                return obj;
            }
        },
        methods: {
            finished: function() { //完成按钮处理函数，点击完成后改变状态
                this.todo.isFinished = !this.todo.isFinished;
            },
            remove: function() {
                if (!this.todo.isFinished) {
                    return false;
                }
                this.$emit('remove', this.index); //发出remove事件
                //todoList.splice(todoList.indexOf(this.todo),1);
            }
        }
    };
</script>

<style scoped>
    @media screen and (max-width: 400px) {
        .section {
            font-size: 0.8em;
        }
    }
    
    .section {
        display: flex;
        padding: 5px 0px;
        justify-content: space-between;
        align-items: flex-end;
        transition: all 0.3s;
        border-left: #f66 8px solid;
        background-color: rgba(66, 185, 131, 0.6);
        margin-bottom: 10px;
        border-radius: 0 18px 18px 0;
        padding: 3px;
        cursor: pointer;
    }
    
    .tips {
        font-size: small;
        color: rgb(53, 73, 94);
    }
    
    .detail {
        overflow-x: auto;
    }
    
    .finished {
        border-left: #42b983 8px solid;
    }
    
    i .finished {
        color: #42b983;
    }
    
    .section>div:first-child {
        align-self: center;
    }
    
    .section .big {
        font-size: 3em;
        margin: 10px 0;
        line-height: 100%;
    }
    
    .item {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    
    .item>div:last-child {
        display: table;
    }
    
    span:first-child {
        width: 82px;
        vertical-align: middle;
    }
    
    span {
        display: table-cell;
    }
</style>