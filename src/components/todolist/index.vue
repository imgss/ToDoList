<template>
    <div class="todolist">
        <!--侧边栏-->
        <article>
            <transition-group name="list" tag="ul" v-if='todos.length'>
                <li is='todoitem' v-for="(todo,index) in todos" :key="todo.timeStamp" :todo="todo" :index="index" @remove="removeItem" v-if="todo.show"></todoitem>
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
    @media screen and (min-width:950px) {
        .todolist {
            position: relative;
            display: flex;
            top: 100px;
            left: 18%;
            width: 82%;
        }
        article {
            float: right;
            width: 70%;
            height: 100%;
            margin-left: 5%;
            padding: 10px;
        }
    }
    
    @media screen and (max-width: 950px) {
        .todolist {
            position: relative;
            display: flex;
            top: 100px;
            left: 5%;
            width: 95%;
        }
        article {
            float: right;
            width: 90%;
            height: 100%;
            margin: 0 3px;
            padding: 10px;
        }
        div.item {
            flex-shrink: 1;
        }
    }
    
    ul {
        margin: 0;
        padding: 0;
    }
    /*.section>div:last-child{*/
    /*float:right;*/
    /*}*/
    
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
        transition: translate 0.8s;
    }
    
    .list-item {
        transition: all 0.8s;
    }
</style>