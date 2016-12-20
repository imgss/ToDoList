<template>
    <header id="add">
        <div>
            <span>To Do List </span>
            <i title='新增一个项目' class="fa fa-plus-square fa-1x" @click="show=!show"></i>
        </div>
        <transition name="fade">
            <additem v-show="show" @hide="show=!show"></additem>
        </transition>
        <timeline :timelen="timeLen"></timeline>
    </header>
</template>
<script>
    import additem from './additem'
    import timeline from './timeline'
    module.exports = { //增加一条项目
        created: function() {
            var self = this;
            setInterval(self.time2width, 1000);

        },
        data: function() {
            return {
                show: false,
                timeLen: ''
            }
        },
        methods: {
            time2width: function() {
                var now, totalSec;
                now = new Date();
                /*            totalSec=(now.getHours()*60+now.getMinutes())*60+now.getSeconds();
                 this.timeLen=(totalSec/(24*60*60)*100)+'%';//计算出当前时间占一天中的百分比*/
                totalSec = now.getMinutes() * 60 + now.getSeconds();
                this.timeLen = (totalSec / (60 * 60) * 100) + '%'; //计算出当前秒占一小时中的百分比
            }
        },
        components: {
            'timeline': timeline,
            'additem': additem
        }
    };
</script>

<style scoped>
    header {
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        font-size: 40px;
        text-align: center;
        color: #333;
        /*border-bottom: solid 1px #42b983;*/
        background-color: rgba(255, 255, 255, 0.4);
    }
    
    header div {
        margin: 5px 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    
    header i {
        transform: translate(0 10px);
    }
    
    header span {
        display: block;
        padding: 3px;
        background: #42b983;
        box-shadow: 0 0 10px #222;
        border-radius: 12px;
    }
    
    header i:hover {
        color: #42b983;
        cursor: pointer;
    }
</style>