<template>
  <div class="card">
    <el-row :gutter="5">
      <el-col :span="6">
        <el-card>
          <detail titles="总销售额" count="126560">
            <template slot="charts">
              <span
                >周同比 &nbsp;56.67
                <svg t="1652514414504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10097" width="16" height="16">
                  <path d="M512 85.333333l249.6 298.666667H262.4z" fill="#3F51B5" p-id="10098"></path>
                  <path d="M426.666667 320h170.666666v576h-170.666666z" fill="#3F51B5" p-id="10099"></path></svg
              ></span>
              <span
                >日同比&nbsp;2356<svg t="1652514414504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10097" width="16" height="16">
                  <path d="M512 85.333333l249.6 298.666667H262.4z" fill="#3F51B5" p-id="10098"></path>
                  <path d="M426.666667 320h170.666666v576h-170.666666z" fill="#3F51B5" p-id="10099"></path></svg
              ></span>
            </template>
            <template slot="footer">
              <div>日销售额 ￥12432</div>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail titles="访问量" count="88460">
            <template slot="charts"> <linecharts></linecharts> </template
            ><template slot="footer">
              <div>日访问量 1234</div>
            </template>
          </detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail titles="支付笔数" count="18">
            <template slot="charts">
             <zuzhuangtu></zuzhuangtu>
            </template>
            <template slot="footer">
              <div>转化率 65%</div>
            </template></detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <detail titles="运营活动效果" count="78%">
            <template slot="charts">
             <jindutiao></jindutiao>
            </template>
            <template slot="footer">
              <span
                >周同比 &nbsp;56.67
                <svg t="1652514414504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10097" width="16" height="16">
                  <path d="M512 85.333333l249.6 298.666667H262.4z" fill="#3F51B5" p-id="10098"></path>
                  <path d="M426.666667 320h170.666666v576h-170.666666z" fill="#3F51B5" p-id="10099"></path></svg
              ></span>
              <span
                >日同比&nbsp;2356<svg t="1652514414504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10097" width="16" height="16">
                  <path d="M512 85.333333l249.6 298.666667H262.4z" fill="#3F51B5" p-id="10098"></path>
                  <path d="M426.666667 320h170.666666v576h-170.666666z" fill="#3F51B5" p-id="10099"></path></svg
              ></span>
            </template>
          </detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import detail from '@/views/dashboard/card/detail.vue'
import linecharts from '@/views/dashboard/card/zexian.vue'
import zuzhuangtu from './zuzhuangtu.vue'
import jindutiao from './jindutiao.vue'
export default {
  name: 'Card',
  components: { detail, linecharts, zuzhuangtu,jindutiao }
}
</script>,
    Jindutiao

<style scoped>
el-card {
  margin: 0;
  padding: 0;
}
</style>
