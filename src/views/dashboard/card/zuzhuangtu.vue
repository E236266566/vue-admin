<template>
  <div class="zu" ref="zuzhuangtu"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  mounted() {
    const cxt = echarts.init(this.$refs.zuzhuangtu)
    cxt.setOption({
      xAxis: {
        // show: false,
        type: 'category'
      },
      yAxis: {
        // show: false
      },
      series: [
        {
          type: 'bar',
          data:[12,15,16,10,18,20,12,29]
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip:{}
    })
  }
}
</script>

<style scoped>
.zu{
  width: 100%;
  height: 100%;
}
</style>
