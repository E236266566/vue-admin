<template>
  <div class="search">
    <el-card>
      <div slot="header" class="header">
        <span>sear</span>
        <el-dropdown>
          <svg t="1652659877249" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1896" width="16" height="16">
            <path
              d="M312.91392 512.8192a91.87328 91.87328 0 1 0-183.76704 0.75776 91.93472 91.93472 0 0 0 92.2624 91.5456 91.9552 91.9552 0 0 0 91.50464-92.30336z m398.17216-1.65888a91.91424 91.91424 0 1 0 183.82848-0.73728 91.91424 91.91424 0 0 0-183.82848 0.73728z m-291.00032 1.20832a91.89376 91.89376 0 0 0 183.76704-0.75776 91.87328 91.87328 0 1 0-183.76704 0.75776z m0 0"
              fill="#8E8E8E"
              p-id="1897"
            />
          </svg>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-row :gutter="10">
        <el-col :span="12"><linecharts></linecharts></el-col>
        <el-col :span="12"><linecharts></linecharts></el-col>
      </el-row>
      <!-- <div class="content">
        <linecharts />
        <linecharts />
      </div> -->
      <el-table :data="tableData" style="width: 100%;" :default-sort="{ prop: 'date', order: 'descending' }">
        <el-table-column label="排名" type="index" width="80"> </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="180"> </el-table-column>
        <el-table-column prop="address" label="用户数" sortable> </el-table-column>
        <el-table-column prop="name" label="周涨幅" sortable width="180"> </el-table-column>
      </el-table>
 
      <el-pagination class="pagination" layout="prev, pager, next" :total="1000"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import linecharts from './lincharts/index.vue'
export default {
  name: '',
  components: {
    linecharts
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
// .content {
//   width: 100%;
//   display: flex;
//   // justify-content: space-around;
//   .lincharts {
//     flex: 1;
//   }
// }
.pagination{
text-align: center;
}
</style>
