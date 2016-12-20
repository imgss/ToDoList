<template>
    <div id="todolist">
        <!--侧边栏-->
        <article>
            <transition-group name="list" tag="ul" v-if='todos.length'>
                <todoitem v-for="(todo,index) in todos" :key="index" :todo="todo" :index="index" @remove="removeItem" v-if="todo.show"></todoitem>
            </transition-group>
            <p v-else>您还没有添加今天要做的事</p>
        </article>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex';

    import todoitem from './todoitem'
    export default {
        created: function() {
            if (!localStorage.todos) {
                return false;
            } else {
                this.todos = JSON.parse(localStorage.todos);
            }
        },
        computed: {
            ...mapGetters([
                'todos',
                'countTodos',
                'countFinishedItems'

            ])
        },
        methods: {
            ...mapMutations([
                'removeItem',
                'listByProp',
                'listByDeadline',
                'onlyUnfinished'

            ])
        },
        components: {
            'todoitem': todoitem
        }
    };
</script>

<style>
    #todolist {
        position: relative;
        display: flex;
        top: 100px;
        left: 18%;
    }
    
    aside {
        width: 18%;
    }
    
    article {
        float: right;
        width: 80%;
        height: 100%;
        margin-left: 5px;
        padding: 10px;
    }
    
    .section {
        /*display:flex;*/
        /*justify-content: flex-start;*/
        /*align-items: flex-end;*/
        transition: all 0.3s;
        border-left: #f66 8px solid;
        background-color: rgba(66, 185, 131, 0.6);
        margin-bottom: 10px;
        border-radius: 0 18px 18px 0;
        padding: 3px;
    }
    
    .big+div div {
        width: 200px;
        overflow: auto;
    }
    
    .tips {
        font-size: small;
        color: rgb(53, 73, 94);
    }
    
    .finished {
        border-left: #42b983 8px solid;
    }
    
    i .finished {
        color: #42b983;
    }
    
    .section {
        display: flex;
        padding: 5px 20px;
        justify-content: space-between;
        align-items: flex-end;
    }
    
    .section>div:first-child {
        align-self: center;
    }
    
    .section .item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .section .big {
        font-size: 3em;
        margin-right: 10px;
        line-height: 100%;
    }
    /*.section>div:last-child{*/
    /*float:right;*/
    /*}*/
    
    .section i {
        cursor: pointer;
    }
    
    article>p {
        font-size: 200%;
        left: 50%;
        height: 50%;
        text-align: center;
        vertical-align: middle;
        color: #888;
    }
    
    @keyframes list-in {
        0% {
            transform: translate(100px);
        }
        100% {
            transform: translate(0px);
        }
    }
    
    @keyframes list-out {
        0% {
            transform: scale(1);
        }
        100% {
            transform: translate(100px);
            opacity: 0;
        }
    }
    /*.list-enter-active,  {*/
    /*transition: all 1s;*/
    /*}*/
    /*.list-leave-active{*/
    /*transition: all 0.3s;*/
    /*}*/
    /*.list-enter, .list-leave-active{*/
    /*opacity: 0;*/
    /*transform: scale(0);*/
    /*}*/
    
    .list-enter-active {
        animation: list-in 0.8s;
    }
    
    .list-leave-active {
        animation: list-out 0.8s;
    }
    
    .list-move {
        transition: transform 0.8s;
    }
</style>