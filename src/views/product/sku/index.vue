<template>
  <div id="sku" class="sku">
    <!-- 表格  -->
    <el-table :data="skuList" border stripe v-loading="loading" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" tooltip-effect="dark" height="calc(100vh - 140px)">
      <el-table-column label="序号" type="index " width="80"> </el-table-column>
      <el-table-column prop="skuName" label="名称"> </el-table-column>
      <el-table-column prop="skuDesc" label="描述" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="skuDefaultImg" label="默认图片" width="140 ">
        <template slot-scope="{ row, index }">
          <img :src="row.skuDefaultImg ? row.skuDefaultImg : defaultLogo" alt="" style="widht: 60px; height: 60px;" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="120"> </el-table-column>
      <el-table-column prop="price" label="价格" width="120"> </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot="header" slot-scope="scope">
          <el-input :placeholder="searchPlaceholder" v-model="searchVal" class="input-with-select" size="mini" clearable @clear="getSkuList(1, (limit = 10))">
            <el-select v-model="searchMethod" slot="prepend" placeholder="请选择搜索方式">
              <el-option label="SKUID" value="SKUID"></el-option>
              <el-option label="关键词" value="关键词"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchDone"></el-button>
          </el-input>
        </template>
        <template slot-scope="{ row, index }">
          <el-tooltip :content="row.isSale == 0 ? '上架' : '下架'" placement="top" effect="dark">
            <el-button type="success" @click="onSaleDone(row)" v-if="row.isSale == 0" icon="el-icon-sort-up" size="mini"></el-button>
            <el-button size="mini" @click="cancelSaleDone(row)" v-else icon="el-icon-sort-down" class="sku-info"></el-button>
          </el-tooltip>

          <el-button type="danger" size="mini" @click="deleteById(row)" icon="el-icon-delete"></el-button>
          <el-button type="info" size="mini" @click="getSkuInfo(row)" icon="el-icon-info" class="sku-info"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页  -->
    <el-pagination background :page-size="limit" :page-count="pages" :page-sizes="[10, 20, 30, 40]" :total="total" prev-text="上一页" next-text="下一页" @size-change="sizeChange" @current-change="getSkuList" :current-page.sync="page" layout="prev, pager,next,jumper, ->,total,sizes"> </el-pagination>
    <!-- sku详情抽屉 -->
    <el-drawer title="SKU详情" :visible.sync="skuInfoVisiable" direction="rtl" size="500px" @close="skuInfoClose" :destroy-on-close="true" :wrapperClosable="true" v-loading="skuLoading">
      <!-- 内容 -->
      <el-form :model="skuInfo" ref="skuInfoRef" label-width="80px" size="normal">
        <el-form-item label="名称">
          <el-input v-model="skuInfo.skuName" type="textarea" autosize style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="价格"> {{ skuInfo.price }}元 </el-form-item>
        <el-form-item label="重量"> {{ skuInfo.weight }}KG </el-form-item>
        <el-form-item label="图片">
          <el-carousel :interval="2000" arrow="always" direction="vertical">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" :alt="item.imgName" style="widht: 300px; height: 400px;" />
            </el-carousel-item>
          </el-carousel>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="skuInfo.skuName" type="textarea" :autosize="{ maxRows: 6, minRows: 3 }" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sku',
  props: {
    // 父传子
  },
  data() {
    return {
      page: 1,
      pages: 0, //总页数
      limit: 10,
      total: 0,
      loading: false,
      skuList: [],
      searchVal: '',
      searchMethod: 'SKUID',
      skuInfo: {},
      skuInfoVisiable: false,
      skuLoading: false,
      isSale: 1
    }
  },
  created() {
    // 实例被创建钩子
  },
  computed: {
    // 计算属性
    ...mapState('app', ['defaultLogo']),
    searchPlaceholder() {
      return this.searchMethod === 'SKUID' ? '请输入需搜索的SKUID' : '请输入搜索关键词'
    }
  },
  components: {
    // 组件引用
  },
  methods: {
    // 方法
    sizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    async getSkuList(pages = 1) {
      this.loading = true
      this.page = pages
      let { page, limit } = this
      let res = await this.$API.sku.reqSkuList(page, limit)
      if (res.code == 200) {
        this.skuList = res.data.records
        this.total = res.data.total
        this.pages = res.data.pages
        this.loading = false
        this.$notify({
          title: '请求成功！',
          type: 'success'
        })
      }
    },
    // 搜索功能
    async searchDone() {
      let { searchMethod, searchVal } = this
      let res = {}
      if (searchMethod == '关键词') {
        res = await this.$API.sku.findSkuInfoByKeyword(searchVal)
        console.log('res: ', { ...res })
      } else {
        res = await this.$API.sku.getSkuById(searchVal)
        this.skuList = res.data ? [res.data] : []
      }
    },
    // 查看详情
    async getSkuInfo(row) {
      this.skuLoading = true
      this.skuInfoVisiable = true
      let res = await this.$API.sku.getSkuById(row.id)
      if (res.code == 200) {
        this.skuInfo = res.data
        console.log('this.skuInfo : ', this.skuInfo)
      }
      this.skuLoading = false
    },
    skuInfoClose() {
      this.skuInfoVisiable = false
      this.skuInfo = {}
    },
    // 删除
    deleteById(row) {
      this.$confirm(`是否删除 ${row.skuName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await this.$API.sku.deleteSku(row.id)
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.getSkuList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 下架
    async cancelSaleDone(row) {
      let res = await this.$API.sku.cancelSale(row.id)
      if (res.code == 200) {
        row.isSale = 0
        this.$notify({
          title: '下架成功！',
          type: 'success'
        })
      }
    },
    // 上架
    async onSaleDone(row) {
      let res = await this.$API.sku.reqOnSale(row.id)
      if (res.code == 200) {
        row.isSale = 1
        this.$notify({
          title: '上架成功！',
          type: 'success'
        })
      }
    }
  },
  mounted() {
    // Dom挂载钩子
    this.getSkuList()
  },
  watch: {
    // 监测变化
  }
}
</script>
<style scoped lang="scss">
.sku {
  .el-pagination {
    margin-top: 15px;
    text-align: center;

    ::v-deep .btn-prev,
    ::v-deep .btn-next {
      padding: 0 5px;
    }
  }
  .el-carousel {
    width: 400px;
    height: 300px;
    border-radius: 6px;
    ::v-deep .el-carousel__button {
      pointer-events: none;
      width: 3px;
      border-radius: 2px;
    }
  }
  .sku-info {
    background: #c8d6e5;
    border: none;
    color: #fff;
  }
}
</style>
