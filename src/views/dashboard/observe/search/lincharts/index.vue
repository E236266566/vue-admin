<template>
  <div class="lincharts">
    <div class="header">
      <span>搜索用户数 </span>
      <svg t="1652510653695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2052" width="26" height="26">
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2053"
        />
      </svg>
    </div>
    <div class="main">
      <span>12321 &nbsp;</span>
      <span>17.1 </span>
      <i class="el-icon-bottom" />
      <i class="el-icon-top" />
    </div>
    <div class="footer">
      <div ref="charts" class="chars" />
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  mounted() {
    const cxt = echarts.init(this.$refs.charts)
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
          type: 'line',
          data: [10, 7, 33, 12, 56, 13],
          itemStyle: {
            opacity: 0
          },
        }],
        grid:{
          top:20,
          bottom:20
        }

    })
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
  }
}
.main{
  margin-top: 10px;
}
.chars{
  width: 100%;
  height: 100px;
}
</style>
