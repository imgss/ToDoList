<template>
    <div class='todolist editor'>
        <textarea v-model="md"></textarea>
        <div v-html="html" id='board'>html</div>
        <i class="fa fa-floppy-o fa-2x"></i>
     </div>
</template>

<script>
    import {
        markdown
    } from 'markdown'

    export default {
        data: function() {
            return {
                md: '# string'
            }
        },
        computed: {
            html: function() {
                return markdown.toHTML(this.md);

            }
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