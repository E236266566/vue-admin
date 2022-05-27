<template>
  <div class="jindu" ref="jindu"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  mounted() {
    const cxt = echarts.init(this.$refs.jindu)
    cxt.setOption({
      xAxis: {
        // show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        // show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          barWidth: 10,
          color: 'yellowgreen',
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          label:{
            formatter:'|',
            position:'right'
          }
        }
      ]
    })
  }
}
</script>

<style scoped>
.jindu {
  width: 100%;
  height: 100%;
}
</style>
