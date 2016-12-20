<template>
  <form id="addItem">
      <div>
          <label for="waitTo">待做事项：</label>
          <input id="waitTo" type="text" v-model.trim="newToDo.value" :class="{ alert: alert }" required>
      </div>
      <div>
          <label for="important">重要程度：</label>
          <select id="important" v-model.number="newToDo.isImportant">
              <option value="0">不重要</option>
              <option value="1">不太重要</option>
              <option value="2">重要</option>
              <option value="3">很重要</option>
          </select>
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
    #addItem div {
        display: table-row;
    }
    
    #addItem div * {
        display: table-cell;
    }
    
    #addItem {
        position: fixed;
        box-sizing: border-box;
        display: table;
        overflow: hidden;
        text-align: left;
        font-size: 16px;
        line-height: 2em;
        padding: 30px;
        border-radius: 20px 0 0 0;
        z-index: 999;
        top: 50%;
        left: 50%;
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