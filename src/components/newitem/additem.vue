<template>
    <div id='wrap'>
        <form id="addItem">
            <div>
                <label for="waitTo">待做事项：</label>
                <input id="waitTo" type="text" v-model.trim="newToDo.value" :class="{ alert: alert }" required>
            </div>
            <div>
                <label for="important">重要程度：</label>
                <input type="range" id="important" v-model.number="newToDo.isImportant" min='0' max='3'>{{importantStr}}
            </div>
            <div>
                <label for="deadline">截止时间：</label>
                <input type="time" id="deadline" v-model="newToDo.deadline" :class="{ alert: alert }" required>
            </div>
            <div>
                <label for="tips">备注：</label>
                <input type="text" id="tips" v-model="newToDo.tips" >
            </div>
                <button @click.prevent="submit()">确定</button>
                <button @click.prevent="hide">关闭</button>
        </form>
  </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex';
    export default {
        name: 'additem',
        data: function() {
            return {
                alert: false,
                newToDo: {
                    isImportant: 0,
                    isFinished: false,
                    value: '',
                    tips: '',
                    deadline: '',
                    timeStamp: '',
                    show: true //新增项目默认显示
                }
            }
        },
        computed: {
            importantStr: function() {
                var imArr = ['不重要', '较重要', '重要', '很重要'];
                return imArr[this.newToDo.isImportant];
            }

        },
        methods: {
            copyObj: function(old) { //向组件传递数据时，复制对象
                if (Object.assign) {
                    return Object.assign({}, old);
                }
                var nObj = {},
                    prop;
                for (prop in old) {
                    if (old.hasOwnProperty(prop)) {
                        nObj[prop] = old[prop];
                    }
                }
                return nObj;
            },
            submit: function() {
                if (!this.newToDo.value || !this.newToDo.deadline) { //必须填写截止时间
                    this.alert = true;
                    return false;
                }
                this.alert = false;
                this.newToDo.isImportant = parseInt(this.newToDo.isImportant); //接受到的isImportant是字符串，转换为数字
                this.newToDo.timeStamp = (new Date()).toTimeString(); //增加时间戳
                var copy = this.copyObj(this.newToDo);
                //showItem.todos.push(this.newToDo);//这样只会传递引用
                this.$store.commit('additem', copy); //actions
            },
            hide: function() {
                this.$emit('hide');
            }
        }
    }
</script>

<style scoped>
    #wrap {
        position: fixed;
        transition: all 0.3s;
        z-index: 999;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        width: 100vw;
        height: 100vh;
        background-color: rgba(20, 20, 20, 0.6);
        text-align: center;
    }
    
    #addItem div {
        display: table-row;
    }
    
    #addItem div * {
        display: table-cell;
    }
    
    #addItem {
        position: absolute;
        left: 50%;
        top: 50%;
        box-sizing: border-box;
        display: table;
        overflow: hidden;
        text-align: left;
        font-size: 16px;
        line-height: 2em;
        padding: 30px;
        border-radius: 20px 0 0 0;
        width: 400px;
        height: 300px;
        transform: translate(-200px, -150px);
        background-color: rgba(66, 185, 131, 1);
        box-shadow: #333333 3px 3px 20px;
    }
    
    #addItem button {
        margin-bottom: 5px;
        margin-right: 5px;
        padding: 4px;
        border-radius: 4px;
    }
    
    .alert {
        transition: border 0.5s;
        border: red 1px solid;
    }
</style>