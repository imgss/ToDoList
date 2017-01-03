<template>
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
<p v-else>加载中...</p>
</template>

<script>
    export default {
        data() {
            return {
                url: 'http://api.map.baidu.com/telematics/v3/weather?location=上海&output=json&ak=HGOUnCXeQLEeywhGOu2jU29PFdC6duFF',
                weatherInfo: null
            }
        },
        created() {
            this.getWeather();
        },
        methods: {
            getWeather() {
                this.$http.jsonp(this.url)
                    .then((response) => { //异步
                        console.log(response);
                        this.weatherInfo = response.data.results[0];
                    })
            },
            addClass(e) {
                if (e.currentTarget.nodeName == 'LI') {
                    var li = e.currentTarget;
                    if (!/show/.test(li.className)) {
                        li.className += ' show';
                    } else {
                        li.className = li.className.replace(' show', '');
                    }
                }

            }

        },
        watch: {
            weatherInfo: function(val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
            }
        }
    }
</script>

<style scoped>
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
</style>