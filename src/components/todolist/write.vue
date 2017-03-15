<template>
    <div class='todolist ' id='editor'>
        <div class='date'>
        <i class="fa fa-floppy-o fa-2x" @click='save_diary(md)' @keyup.alt.13='save_diary(md)' alt="保存"></i>|
        <i class="fa fa-2x" :class=" proview?'fa-columns':'fa-eye'" @click='proview=!proview'  alt="预览"></i>|
        <i class="fa fa-2x fa-folder-open"  @click='open=!open'  alt="打开文件"></i>|
        <span style="text-align:center"> <i class="fa fa-calendar" aria-hidden="true"></i>今天是:{{date}}</span>
        <input v-if="open" type="file" id='mdfile' @change="readfile">
        </div>
        <div class="wrapper">
        <textarea v-model="md" v-if="!proview" placeholder="输入markdown"></textarea>
        <div v-html="html" id='board' :style="{width:proview?'100%':'49%'}">html</div>
        </div>
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
                md: '',
                proview: false,
                open: false
            }
        },
        computed: {
            html: function() {
                return markdown.toHTML(this.md);
            },
            date: function() {
                return ((new Date()).toDateString().substring(4)).replace(/\ /g, ',');
            }
        },
        methods: {
            ...mapMutations([
                'save_diary'
            ]),
            readfile(event) {
                var that = this;
                var file = event.target.files[0];
                if (file.name.includes('.md') || file.name.includes('.markdown')) {
                    var reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = function(e) {
                        that.md = e.target.result;
                    }

                }


            }
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
    div.date {
        width: 84%;
    }
    
    div i {
        margin-right: 5px;
        margin-top: -30px;
        cursor: pointer;
    }
    
    .wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 75vh;
    }
    
    #editor {
        color: #333;
        margin-bottom: 10px;
        height: 70vh;
        display: block;
    }
    
    #board {
        background: #fef898;
        line-height: 1.5em;
    }
    
    @media screen and (min-width:600px) {
        textarea,
        #board {
            border: 1px solid #aaa;
            display: block;
            margin: 0;
            margin-top: 20px;
            padding: 0;
            min-width: 49%;
            /*width: 49%;*/
            height: 100%;
            overflow: auto;
        }
    }
    
    @media screen and (max-width:600px) {
        textarea,
        #board {
            border: 1px solid #aaa;
            display: block;
            margin: 0;
            margin-top: 20px;
            padding: 0;
            width: 100%;
            min-width: 49%;
            height: 49%;
            overflow: auto;
        }
    }
</style>