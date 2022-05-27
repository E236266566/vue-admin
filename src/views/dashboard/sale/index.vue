<template>
  <el-card>
    <div slot="header" class="clear">
      <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <div class="riqi">
        <span @click="setd">今日</span>
        <span @click="setweek">本周</span>
        <span @click="setmounth">本月</span>
        <span @click="setyear">本年</span>
        <el-date-picker class="date" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"> </el-date-picker>
      </div>
    </div>
    <el-row>
      <el-col :span="16">
        <div class="charts" ref="charts"></div>
      </el-col>
      <el-col :span="8">
        <h3>门店{{ activeName }}排名</h3>
        <ul>
          <li>
            <span
              ><svg t="1652589794580" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3920" width="16" height="16">
                <path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m56.32 768h-64V339.84L422.4 427.52 384 387.84 512 256h56.32z" fill="#333333" p-id="3921"></path></svg></span
            ><span class="name">肯德基</span><span>12453</span>
          </li>
          <li>
            <span
              ><svg t="1652590979874" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4124" width="16" height="16">
                <path
                  d="M514.048 22.628352C243.775488 22.628352 24.676352 241.727488 24.676352 512S243.775488 1001.371648 514.048 1001.371648 1003.419648 782.272512 1003.419648 512 784.320512 22.628352 514.048 22.628352z m129.302528 678.637568H367.345664v-24.664064c60.485632-132.716544 233.723904-161.492992 233.723904-278.35392 0-40.51968-26.425344-83.388416-92.78464-83.388416-42.28096 0-88.086528 25.839616-102.76864 85.737472l-36.409344-5.871616c14.094336-69.29408 68.120576-114.511872 139.177984-114.511872 86.913024 0 130.955264 48.154624 130.955264 116.860928 0 128.018432-140.939264 150.921216-220.217344 269.545472h224.32768v34.646016z"
                  fill="#2E333A"
                  p-id="4125"
                ></path>
                <path
                  d="M639.240192 397.074432c0-68.708352-44.044288-116.860928-130.955264-116.860928-71.057408 0-125.083648 45.217792-139.177984 114.511872l36.409344 5.871616c14.682112-59.899904 60.485632-85.737472 102.76864-85.737472 66.359296 0 92.78464 42.868736 92.78464 83.388416 0 116.860928-173.238272 145.637376-233.723904 278.35392v24.664064h276.004864v-34.648064H419.022848c79.27808-118.622208 220.217344-141.524992 220.217344-269.543424z"
                  fill="#FFFFFF"
                  p-id="4126"
                ></path></svg></span
            ><span class="name">肯德基</span><span>12453</span>
          </li>
          <li>
            <span
              ><svg t="1652591375272" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3895" width="16" height="16">
                <path
                  d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m12.16 768a202.88 202.88 0 0 1-172.16-81.92l35.84-38.4a167.04 167.04 0 0 0 135.04 64c70.4 0 113.28-36.48 113.28-92.8s-49.28-86.4-120.32-86.4h-50.56v-55.68h49.92c64 0 112.64-24.32 112.64-81.92S576 311.04 520.32 311.04a163.2 163.2 0 0 0-128 60.16l-33.92-38.4A206.72 206.72 0 0 1 524.8 256c92.8 0 163.84 48 163.84 131.84a118.4 118.4 0 0 1-104.32 115.2 128 128 0 0 1 112 122.88C696.96 707.84 631.04 768 524.16 768z"
                  fill="#333333"
                  p-id="3896"
                ></path></svg></span
            ><span class="name">肯德基</span><span>12453</span>
          </li>

          <li><span>4</span><span class="name">肯德基</span><span>12453</span></li>
          <li><span>5</span><span class="name">肯德基</span><span>12453</span></li>
          <li><span>6</span><span class="name">肯德基</span><span>12453</span></li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as dayjs from 'dayjs'
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      activeName: '销售额',
      cxt: '',
      value1: []
    }
  },
  watch: {
    activeName: {
      handler(o, n) {
        this.cxt.setOption({
          title: {
            text: `${this.activeName}趋势`
          }
        })
        console.log(o)
        if (o === '访问量') {
          this.cxt.setOption({
            series: [
              {
                data: [15, 45, 12, 98, 26, 45, 32, 34, 45, 27, 19, 58]
              }
            ]
          })
        } else {
          this.cxt.setOption({
            series: [
              {
                data: [78, 45, 12, 78, 26, 45, 26, 34, 45, 12, 19, 58]
              }
            ]
          })
        }
      }
    }
  },
  mounted() {
    this.cxt = echarts.init(this.$refs.charts)

    this.cxt.setOption({
      title: {
        text: `销售额趋势`
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        // show: false,
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      },
      yAxis: {
        // show: false
      },
      series: [
        {
          type: 'bar',
          data: [78, 45, 12, 78, 26, 45, 26, 34, 45, 12, 19, 58]
        }
      ]
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    setd() {
      this.value1 = ''
      const day = dayjs().format('YYYY-MM-DD')
      this.value1 = [day, day]
    },
    setweek() {
      this.value1 = ''
      const weekstart = dayjs().day(0).format('YYYY-MM-DD')
      const weekend = dayjs().day(6).format('YYYY-MM-DD')
      this.value1 = [weekstart, weekend]
    },
    setmounth() {
      this.value1 = ''
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.value1 = [start, end]
    },
    setyear() {
      this.value1 = ''
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.value1 = [start, end]
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-card__header{
border-bottom: none;
}
.clear {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.riqi {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  span {
    padding-right: 10px;
  }
}
.date {
  width: 250px;
}
.charts {
  height: 300px;
  width: 100%;
}
ul {
  list-style: none;
  width: 100%;
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;
    height: 30px;
    .name {
      margin-left: -200px;
    }
  }
}
</style>
