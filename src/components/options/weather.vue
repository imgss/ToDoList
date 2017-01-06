<template>
    <!--显示天气界面-->
<ul class='weather' v-if="weatherInfo">
  <li><h3 style='display:inline; color: #f66'>{{weatherInfo.currentCity}}</h3>  |  pm2.5-{{weatherInfo.pm25}}</li>   
  <li>
    <ul>
      <li v-for="item in weatherInfo.weather_data" class='detail' @click='addClass'>
        <p title="详情" class='date'>{{item.date.slice(0,10)}}</p>
        <p>
        <img :src="item.dayPictureUrl">
        <img :src="item.nightPictureUrl">
        </p>
        <p>{{item.weather}}</p>
        <p>{{item.wind}}</p>
        <p>{{item.temperature}}</p>
        </li>
    </ul>
  </li>
</ul>
<!--加载动画-->
    <p id="preloader_1" v-else>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
    </p>
</template>

<script>
    export default {
        data() {
            return {
                url: 'http://api.map.baidu.com/telematics/v3/weather?location=上海&output=json&ak=HGOUnCXeQLEeywhGOu2jU29PFdC6duFF',
                weatherInfo: null,
                timer: null
            }
        },
        created() { //钩子函数，组件创建完成时调用getWeather方法获取天气信息
            this.getWeather();
            setTimeout(this.getWeather, 2000); //有时一次加载不出来？？

        },
        methods: {
            getWeather() { //从百度api获取天气信息
                this.$http.jsonp(this.url)
                    .then((response) => { //异步
                        console.log(response);
                        this.weatherInfo = response.data.results[0];
                    });
            },
            addClass(e) { //通过这个方法完成天气信息的显示和隐藏。
                if (e.currentTarget.nodeName == 'LI') {
                    var li = e.currentTarget;
                    if (!/show/.test(li.className)) {
                        li.className += ' show';
                    } else {
                        li.className = li.className.replace(' show', '');
                    }
                }

            }

        }
    }
</script>

<style scoped>
    div {
        background-color: rgba(0, 0, 0, 0);
        padding: 0;
    }
    
    ul>li {
        border-bottom: 1px solid #f66;
    }
    
    .weather {
        background-color: rgba(66, 185, 131, 0.7);
        /*width: 160px;*/
        padding: 4px;
        border-radius: 5px;
    }
    
    .detail {
        border-bottom: 1px solid white;
        transition: all 0.3s;
    }
    
    .detail>p {
        line-height: 12px;
        display: none;
    }
    
    .detail.show p {
        display: block;
    }
    
    .detail .date {
        display: block;
        cursor: pointer;
    }
    
    .detail .date:hover {
        border-right: 3px solid #f66;
    }
    /******************* PRELOADER 1 **********
*******************************************/
    
    #preloader_1 {
        position: relative;
        left: 35%;
        top: 10%;
        text-align: center;
    }
    
    #preloader_1 span {
        display: block;
        bottom: 0px;
        width: 9px;
        height: 5px;
        background: #9b59b6;
        position: absolute;
        -webkit-animation: preloader_1 1.5s infinite ease-in-out;
        -moz-animation: preloader_1 1.5s infinite ease-in-out;
        -ms-animation: preloader_1 1.5s infinite ease-in-out;
        -o-animation: preloader_1 1.5s infinite ease-in-out;
        animation: preloader_1 1.5s infinite ease-in-out;
    }
    
    #preloader_1 span:nth-child(2) {
        left: 11px;
        -webkit-animation-delay: .2s;
        -moz-animation-delay: .2s;
        -ms-animation-delay: .2s;
        -o-animation-delay: .2s;
        animation-delay: .2s;
    }
    
    #preloader_1 span:nth-child(3) {
        left: 22px;
        -webkit-animation-delay: .4s;
        -moz-animation-delay: .4s;
        -ms-animation-delay: .4s;
        -o-animation-delay: .4s;
        animation-delay: .4s;
    }
    
    #preloader_1 span:nth-child(4) {
        left: 33px;
        -webkit-animation-delay: .6s;
        -moz-animation-delay: .6s;
        -ms-animation-delay: .6s;
        -o-animation-delay: .6s;
        animation-delay: .6s;
    }
    
    #preloader_1 span:nth-child(5) {
        left: 44px;
        -webkit-animation-delay: .8s;
        -moz-animation-delay: .8s;
        -ms-animation-delay: .8s;
        -o-animation-delay: .8s;
        animation-delay: .8s;
    }
    
    @-webkit-keyframes preloader_1 {
        0% {
            height: 5px;
            -webkit-transform: translateY(0px);
            background: #9b59b6;
        }
        25% {
            height: 30px;
            -webkit-transform: translateY(15px);
            background: #3498db;
        }
        50% {
            height: 5px;
            -webkit-transform: translateY(0px);
            background: #9b59b6;
        }
        100% {
            height: 5px;
            -webkit-transform: translateY(0px);
            background: #9b59b6;
        }
    }
    
    @-moz-keyframes preloader_1 {
        0% {
            height: 5px;
            -moz-transform: translateY(0px);
            background: #9b59b6;
        }
        25% {
            height: 30px;
            -moz-transform: translateY(15px);
            background: #3498db;
        }
        50% {
            height: 5px;
            -moz-transform: translateY(0px);
            background: #9b59b6;
        }
        100% {
            height: 5px;
            -moz-transform: translateY(0px);
            background: #9b59b6;
        }
    }
    
    @-ms-keyframes preloader_1 {
        0% {
            height: 5px;
            -ms-transform: translateY(0px);
            background: #9b59b6;
        }
        25% {
            height: 30px;
            -ms-transform: translateY(15px);
            background: #3498db;
        }
        50% {
            height: 5px;
            -ms-transform: translateY(0px);
            background: #9b59b6;
        }
        100% {
            height: 5px;
            -ms-transform: translateY(0px);
            background: #9b59b6;
        }
    }
    
    @keyframes preloader_1 {
        0% {
            height: 5px;
            transform: translateY(0px);
            background: #9b59b6;
        }
        25% {
            height: 30px;
            transform: translateY(15px);
            background: #3498db;
        }
        50% {
            height: 5px;
            transform: translateY(0px);
            background: #9b59b6;
        }
        100% {
            height: 5px;
            transform: translateY(0px);
            background: #9b59b6;
        }
    }
</style>