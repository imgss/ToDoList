<template>
<div id="#app">
 <newitem @toggleview='toggleview'></newitem>
  <!--<router-view></router-view>-->
  <keep-alive>
  <compoment v-bind:is='currentview'></compoment>
  </keep-alive>
  <options></options>
  </div>
</template>

<script>
    import todolist from './components/todolist'
    import newitem from './components/newitem'
    import options from './components/options'
    import write from './components/todolist/write'
    export default {
        name: 'app',
        data: function() {
            return {
                currentview: 'todolist'
            }
        },
        methods: {
            toggleview: function() {
                this.currentview = (this.currentview == 'todolist') ? 'write' : 'todolist';
            }
        },
        components: {
            todolist,
            newitem,
            options,
            write
        }
    }
</script>

<style scoped>
    #app {
        min-width: 550px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    
    * {
        margin: 0;
        padding: 0;
    }
    
    body {
        padding: 0 10%;
        font-family: sans-serif, Serif;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        margin-bottom: 0;
        overflow-x: hidden;
        min-width: 500px;
        background-color: #eee;
    }
    
    ul {
        list-style-type: none;
    }
</style>