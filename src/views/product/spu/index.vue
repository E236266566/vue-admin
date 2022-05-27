<template>
  <div id="Spu" class="Spu">
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <CategorySelect :show="showTable !== '1'" @getCateIds="getCateIdsDone" />
    </el-card>
    <el-card shadow="hover" :body-style="{ padding: '10px' }" style="margin-top: 10px;">
      <div v-show="showTable == '1'">
        <el-button type="primary" size="small" icon="el-icon-plus" class="add-spu" @click="addSpu">添加</el-button>
        <!-- 表格展示区域 -->

        <el-table :data="spuList" border stripe :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" height="calc(100vh - 260px)">
          <el-table-column label="序号" type="index" width="120" />
          <el-table-column label="SPU名称" prop="spuName" width="250" />
          <el-table-column label="SPU描述" prop="spuDec" />
          <!-- 操作列 -->
          <el-table-column label="操作">
            <template slot-scope="{ row, index }">
              <el-tooltip content="修改" placement="top" effect="light">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="" />
              </el-tooltip>
              <el-tooltip content="修改" placement="top" effect="light">
                <el-button type="success" size="mini" icon="el-icon-edit" @click="editSpu(row)" />
              </el-tooltip>
              <el-tooltip content="SKU列表" placement="top" effect="light">
                <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuList(row)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top" effect="light">
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteSpu(row.spuId)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页     @size-change="sizeChange"
              @current-change="currentChange"-->
        <el-pagination style="text-align: center;" :current-page.sync="page" :page-sizes="[5, 10, 15, 20]" :page-size="limit" layout="prev, pager, next, jumper,->, sizes,total" :total="total" background>
          :pager-count="7">
        </el-pagination>
      </div>
      <div v-show="showTable == '2'" class="add-spu">
        <SpuForm ref="spuForm" @changeSence="changeSenceDone" />
      </div>
      <div v-show="showTable == '3'" ref="skuForm" class="sku">
        <SkuForm />
      </div>
    </el-card>
    <!-- SKU列表信息 -->
    <el-dialog title="SKU列表信息" :visible.sync="skuVisible" width="800px" @close="close">
      <el-table v-loading="loading" :data="skuList" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" border stripe>
        <el-table-column prop="skuName" label="SKU名称" />
        <el-table-column prop="price" label="价格" width="120px" />
        <el-table-column prop="weight" label="重量" width="120px" />
        <el-table-column label="默认图片" width="150px">
          <template slot-scope="{ row, index }">
            <img :src="row.skuDefaultImg" style="width: 90px; height: 90px;" :alt="row.skuDesc">
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer">
        <el-button @click="close">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  components: {
    // 组件引用
    CategorySelect: () => import('@/components/CategorySelect'),
    SpuForm: () => import('./SpuForm.vue'),
    SkuForm: () => import('./SkuForm.vue')
  },
  props: {
    // 父传子
  },
  data() {
    return {
      cates: {
        cate1Id: '',
        cate2Id: '',
        cate3Id: ''
      },
      // 分页数据
      page: 1,
      limit: 5,
      total: 0,
      showTable: '1',
      skuVisible: false, // SKU列表信息显示
      loading: false,
      skuList: [],
      spu: {},
      spuList: []
    }
  },
  computed: {
    // 计算属性
  },
  watch: {
    // 监测变化
  },
  created() {
    // 实例被创建钩子
  },
  mounted() {
    // Dom挂载钩子
  },
  methods: {
    // 方法
    getCateIdsDone(cates) {
      this.cates = cates

      if (cates.cate3Id) {
        // 发请求
        this.getSpuList()
      }
    },
    // 获取SPU列表
    async getSpuList(pages = 1) {
      this.page = pages
      const { page, limit, cates } = this
      const res = await this.$API.spu.reqSpuList(page, limit, cates.cate3Id)
      console.log('res: ', res)
      if (res.code == 200) {
        this.$notify({
          title: '请求成功！',
          type: 'success'
        })
        this.spuList = res.data.records || []
        this.total = res.total
      }
    },

    addSpu() {
      this.showTable = '2'
      // 调用相关接口
      this.$refs.spuForm.addSpuShow(this.cates.cate3Id)
      this.getSpuList()
    },
    editSpu(row) {
      this.showTable = '2'
      this.$refs.spuForm.editSpuShow(row.spuId)
      this.getSpuList(this.page)
    },
    changeSenceDone(val) {
      this.showTable = val
    },
    async deleteSpu(spuId) {
      const res = await this.$API.spu.deleteSpu(spuId)
      if (res.code == 200) {
        this.$notify({
          title: '请求成功！',
          type: 'success'
        })
        this.getSpuList()
      }
    },
    async getSkuList(row) {
      this.spu = row
      this.skuVisible = true
      this.loading = true
      const res = await this.$API.spu.findBySpuId(1)
      console.log('res: ', res)
      if (res.code == 200) {
        this.$notify({
          title: '请求成功！',
          type: 'success'
        })
        this.skuList = res.data || []
        this.loading = false
      }
    },
    close() {
      this.skuVisible = false
      this.skuList = []
    }
  }
}
</script>
<style scoped lang="scss">
.Spu {
  .add-spu {
    margin-bottom: 10px;
    padding: 7px 10px;
  }
}
</style>
