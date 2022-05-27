<template>
  <div id="SkuForm" class="SkuForm">
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        海绵宝宝
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="model" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="model" placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="model" placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" v-model="model" placeholder="规格描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="屏幕尺寸">
            <el-select v-model="model" placeholder="请选择">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="无线通信">
            <el-select v-model="model" placeholder="请选择">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form>
          <el-form-item label="颜色">
            <el-select v-model="model" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table :data="data" style="width: 100%;" border>
          <el-table-column type="selection" prop="prop" label="label" width="80"> </el-table-column>
          <el-table-column prop="prop" label="图片" width="width"> </el-table-column>
          <el-table-column prop="prop" label="名称" width="width"> </el-table-column>
          <el-table-column prop="prop" label="操作" width="width"> </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  props: {
    // 父传子
  },
  data() {
    return {}
  },
  created() {
    // 实例被创建钩子
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件引用
  },
  methods: {
    // 方法
  },
  mounted() {
    // Dom挂载钩子
  },
  watch: {
    // 监测变化
  }
}
</script>
<style scoped lang="scss">
.SkuForm {
}
</style>
