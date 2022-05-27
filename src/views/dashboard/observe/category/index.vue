<template>
  <div class="category">
    <el-card>
      <div slot="header" class="header">
        <span>销售额类别占比</span>

        <div>
          <el-radio-group v-model="value" size="medium">
            <el-radio-button label="全部渠道" />
            <el-radio-button label="线上" />
            <el-radio-button label="门店" />
          </el-radio-group>
        </div>
      </div>
      <div ref="echart" class="echarts" />
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: '',
  data() {
    return {
      value: '全部渠道'
    }
  },
  mounted() {
    var myChart = echarts.init(this.$refs.echart)
    var option
    option = {
      title: {
        text: '12',
        subtext: '1203',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '40',
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    myChart.setOption(option),
    myChart.on('mouseover', function(params) {
      myChart.setOption({
        title: {
          text: params.data.name,
          subtext: params.data.value,
          left: 'center',
          top: 'center'
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    height: 40px;
    line-height: 40px;
  }
}
.echarts {
  width: 100%;
  height: 200px;
}
</style>
