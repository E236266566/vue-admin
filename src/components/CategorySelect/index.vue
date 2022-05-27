<template>
  <div id="CategorySelect" class="CategorySelect">
    <el-form :inline="true" :model="catesForm" ref="ruleFormRef" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="catesForm.cate1Id" placeholder="请选择一级分类" :disabled="show" @focus="cate1Focus" @change="cate1Change" :loading="selectLoading" clearable>
          <el-option v-for="item in cate1List" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="catesForm.cate2Id" placeholder="请选择二级分类" :disabled="show" @focus="cate2Focus" @change="cate2Change" :loading="selectLoading" clearable>
          <el-option label="区域一" value="shanghai" v-for="item in cate2List" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="catesForm.cate3Id" placeholder="请选择三级分类" :disabled="show" @focus="cate3Focus" @change="cate3Change" :loading="selectLoading" clearable>
          <el-option label="区域一" value="shanghai" v-for="item in cate3List" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    // 父传子
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    /* 自定义表单验证方法
      var validatePass2 = (rule, value, callback) =>{
          console.log('rule, value, callback: ', rule, value, callback);
         if (this.catesForm.cate1Id === '') {
            callback(new Error('请先选择一级分类'));
         }
      };
      var validatePass3 = (rule, value, callback) =>{
          console.log('rule, value, callback: ', rule, value, callback);
         if (this.catesForm.cate1Id === '' && this.catesForm.cate2Id ===  {
            callback(new Error('请先选择一、二级分类'));
         }else if(this.catesForm.cate1Id === ''){
              callback(new Error('请先选择一级分类'));
         }else if(this.catesForm.cate2Id === ''){
              callback(new Error('请先选择二级分类'));
         }else{
              callback();
         }
     } */

    return {
      selectLoading: false,
      catesForm: {
        cate1Id: '',
        cate2Id: '',
        cate3Id: ''
      },
      cate1List: [],
      cate2List: [],
      cate3List: []
    }
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
    // 聚焦时加载三级分类的数据
    async cate1Focus() {
      this.selectLoading = true
      let res = await this.$API.attribute.getCategory1()
      if (res.code == 200) {
        this.cate1List = res.data
      }
      this.selectLoading = false
    },
    async cate2Focus() {
      this.selectLoading = true
      let res = await this.$API.attribute.getCategory2(this.catesForm.cate1Id)
      if (res.code == 200) {
        this.cate2List = res.data
      }
      this.selectLoading = false
    },
    async cate3Focus() {
      this.selectLoading = true
      let res = await this.$API.attribute.getCategory3(this.catesForm.cate2Id)
      if (res.code == 200) {
        this.cate3List = res.data
      }
      this.selectLoading = false
    },
    // 三级分类选中的值发生改变
    cate1Change() {
      this.catesForm.cate2Id = ''
      this.catesForm.cate3Id = ''
      this.$emit('getCateIds', this.catesForm)
    },
    cate2Change() {
      this.catesForm.cate3Id = ''
      this.$emit('getCateIds', this.catesForm)
    },
    cate3Change() {
      this.$emit('getCateIds', this.catesForm)
    }
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
.CategorySelect {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
