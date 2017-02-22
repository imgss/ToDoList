<template>
    <div class='todolist editor'>
        <textarea v-model="md" placeholder="输入markdown"></textarea>
        <div v-html="html" id='board'>html</div>
        <i class="fa fa-floppy-o fa-2x" @click='save_diary(md)' @keyup.alt.13='save_diary(md)' alt="保存"></i>
     </div>
</template>

<script>
    import {
        markdown
    } from 'markdown';
    import {
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex';

    export default {
        data: function() {
            return {
                md: ''
            }
        },
        computed: {
            html: function() {
                return markdown.toHTML(this.md);
            }
        },
        methods: {
            ...mapMutations([
                'save_diary'
            ])
        },
        beforeMount: function() {
            if (this.$store.state.diary) {
                this.md = this.$store.state.diary;
            }
        },
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用,切换路由时自动保存
            console.log(this.md);
            this.$store.commit('save_diary', this.md);
            next();
        }
    }
</script>

<style scoped>
    i {
        position: absolute;
        margin-right: 5px;
        margin-top: -30px;
        cursor: pointer;
    }
    
    .editor {
        color: #333;
        margin-bottom: 20px;
        width: 83%;
        height: 70vh;
    }
    
    textarea,
    #board {
        border: 1px solid #aaa;
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 49%;
        height: 100%;
        overflow: auto;
    }
</style>