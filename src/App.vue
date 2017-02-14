<template>
<div id="#app">
 <newitem></newitem>
  <router-view></router-view>
  <options></options>
  </div>
</template>

<script>
    import todolist from './components/todolist'
    import newitem from './components/newitem'
    import options from './components/options'
    export default {
        name: 'app',
        components: {
            todolist,
            newitem,
            options
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
    }
    
    ul {
        list-style-type: none;
    }
</style>