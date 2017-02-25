<template>
  <div class="timeline">
    <div class="passed" :style="{width:timelen}">
      <div class="point" title="你会发现一小时其实很快">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'timeline',
        props: ['timelen'] //传递的属性名不分大小写，导致使用:timeLen传递属性时失败，没有传递进timeLen的值
    };
</script>

<style scoped>
    .timeline {
        font-size: 5px;
        width: 100%;
        height: 2px;
        margin: 0;
        background-color: #42b983;
        bottom: 0;
    }
    
    .timeline div {
        float: right;
        margin: 0;
        padding: 0;
        display: inline;
        box-shadow: none;
    }
    
    .passed {
        height: 100%;
        background-color: #f66;
    }
    
    .passed .point {
        width: 10px;
        height: 10px;
        background-color: #f66;
        border-radius: 50%;
        margin-top: -5px;
    }
</style>