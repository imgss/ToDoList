<template>
    <aside id="options" :class="{open:isOpen}">
        <i class="fa fa-bars fa-2x" aria-hidden="true" @click='isOpen=!isOpen' @touchend='isOpen=!isOpen'></i>
        <div>
            <h3>今日需完成：<big>{{countTodos}}</big>项</h3>
            <ul>
                <li>已完成:{{countFinishedItems}}</li>
                <li>待完成:{{countTodos-countFinishedItems}}</li>
            </ul>
        </div>
        <div >
            <h3>排列方式：</h3>
            <ul>
                <li @click = "listByProp('isImportant')">
                    <i  class="fa fa-info fa-1x fa-fw"></i>
                    重要程度</li>
                <li @click = "listByDeadline">
                    <i  class="fa fa-hourglass-end fa-1x fa-fw"></i>
                    截止时间</li>
                <li @click = "listByProp('isFinished')">
                    <i  class="fa fa-calendar-check-o fa-1x fa-fw"></i>
                    完成情况</li>
                <li @click = "onlyUnfinished">
                <span v-if="!onlyUnfinish">
                    <i  class="fa fa-circle-o-notch  fa-1x fa-fw">
                    </i>仅显示未完成
                </span>
                    <span v-else>
                    <i  class="fa fa-circle-o  fa-1x fa-fw">
                    </i>显示全部
                </span>
                </li>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex';
    export default {
        data: function() {
            return {
                isOpen: false
            };
        },
        computed: {
            ...mapState([
                'onlyUnfinish'
            ]),
            ...mapGetters([
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
        }
    }
</script>

<style scoped>
    @media screen and (min-width: 950px) {
        #options>i {
            display: none;
        }
    }
    
    @media screen and (max-width: 950px) {
        #options {
            left: -180px;
            transition: left ease-in .3s;
        }
        #options.open {
            left: 0px;
            background-color: rgba(51, 51, 51, 0.8);
        }
        #options.open>i {
            color: ghostwhite;
        }
    }
    
    #options>i {
        position: absolute;
        right: 2px;
        top: 2px;
        cursor: pointer;
    }
    
    #options {
        position: absolute;
        width: 180px;
        top: 62px;
        padding-top: 35px;
        padding-right: 30px;
        z-index: 1;
        overflow-x: hidden;
        overflow-y: auto;
        bottom: 0;
        border-right: solid rgb(66, 185, 131) 1px;
    }
    
    #options div {
        margin: 12px 0;
        margin-top: 0;
        padding: 4px;
        background-color: rgba(66, 185, 131, 0.7);
        border-radius: 5px;
    }
    
    #options h3 {
        padding: 3px 0px;
        border-bottom: solid 1px #f66;
    }
    
    #options div:first-child {
        padding: 3px auto 3px auto;
        border: white dotted 3px;
    }
    
    #options div:first-child p {
        margin: 5px 0;
        overflow: hidden;
    }
    
    #options ul {
        padding-left: 0;
    }
    
    #options li {
        margin: 5px 0;
        padding: 4px 8px;
        border-bottom: solid 1px #f1f1f1;
        cursor: pointer;
    }
</style>