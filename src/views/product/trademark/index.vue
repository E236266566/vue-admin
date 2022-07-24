<template>
  <div id="Trademark" class="Trademark"  v-loading.fullscreen.lock="fullscreenLoading">
    <el-row>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addTradeShow">添加</el-button >
      
     <el-input :placeholder="searchPlaceholder" v-model="searchVal" class="input-with-select" size="medium" clearable @clear="getTradeList(1,limit = 7)">
        <el-select v-model="searchMethod" slot="prepend" placeholder="请选择搜索方式">
          <el-option label="品牌ID" value="品牌ID"></el-option>
          <el-option label="关键词" value="关键词"></el-option>
        </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchDone"></el-button>
    </el-input>
    </el-row >
    <!-- 表格 -->
    <el-skeleton style="width:100%" :loading="loading" animated :count="11">
    <el-table :data="tradeList" border stripe height="calc(100vh - 190px)" style="width: 100%">
    :header-cell-style="{textAlign: 'center'}"
    :cell-style="{textAlign:'center'}"
    >
      <el-table-column prop="id" label="序号" width="140" sortable> </el-table-column>
      <el-table-column prop="logoUrl" label="品牌图标" width="180"> 
        <template slot-scope="{row}"> <img class="logo-img" 
        :src="row.logoUrl.includes('http') ? row.logoUrl : defaultLogo " />
         <!-- 本地路径就显示默认图标，网络路径显示原本logo -->  
        </template>   
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column   label="操作">
        <template slot-scope="{row}">
           <el-button size="mini" type="primary" class="edit-tm" icon="el-icon-edit"  @click="updateTradeShow(row)">修改</el-button>
           <el-button size="mini" type="info" class="info-tm" icon="el-icon-info"  @click="getTradeInfo(row)">详情</el-button>
           <el-button size="mini" type="danger"  class="delete-tm" icon="el-icon-delete" @click="deleteTradeById(row)">删除</el-button>
        </template>    
     </el-table-column>
    </el-table>

    <!-- 分页 -->
     <el-pagination
      background
      hide-on-single-page
      :page-size="limit"
      :page-sizes="[7, 15, 30, 40]"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
      @size-change="sizeChange"
      @current-change="getTradeList"
      :current-page.sync="page"
      layout="prev, pager,next,jumper,->,total,sizes"
      >
    </el-pagination>
  </el-skeleton>

  <!-- 修改对话框 -->
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="closeDialog">
      <el-form :model="tradeForm" ref="tradeFormRef" :rules="tradeFormRules" label-width="80px">
          <el-form-item prop="tmName"  label="品牌名称">
                <el-input placeholder="请输入品牌名称" v-model="tradeForm.tmName"></el-input>
          </el-form-item>
          <el-form-item prop="logoUrl" label="品牌图标">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action="/api/admin/product/fileUpload"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="tradeForm.logoUrl" :src="tradeForm.logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB!</div>
              </el-upload>
          </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
</el-dialog>

    <!-- 品牌详情抽屉 -->
    <el-drawer title="品牌详情" :visible.sync="tradeInfoVisiable" direction="rtl" size="500px"
       @close ="tradeInfoClose" :destroy-on-close="true"   :wrapperClosable="true" v-loading="tmLoading"> 
       <!-- 内容 -->
       <el-form :model="tradeInfo" ref="tradeInfoRef"   label-width="80px"  size="normal">
         <el-form-item label="ID">
            {{tradeInfo.id}}
         </el-form-item>
         <el-form-item label="名称">
           {{tradeInfo.tmName}}
         </el-form-item>
         <el-form-item label="LOGO">
             <img :src="tminfoimg" style="width:300px;">
         </el-form-item>
       </el-form>
       
    </el-drawer>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Trademark",
  props: {
    // 父传子
  },
  data() {
    return {
      page:1,
      limit:7,
      total:0,
      tradeList:[],
      loading:false,//骨架屏控制
      // 弹窗相关
      title:'',
      dialogVisible:false,
      curRow:{},
      tradeForm:{
        tmName:'',
        logoUrl:'',
      },
      fullscreenLoading:false,//整页加载
      imageUrl:'',
      searchMethod:'品牌ID',
      searchVal:'',
      
      tradeInfo:{},// 详情
      tradeInfoVisiable:false,
      tmLoading:false,

      tradeFormRules:{
         tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
         ],
         logoUrl: [
            { required: true, message: '请选择品牌图标', trigger: 'blur' },
         ],
      }
    };
  },
  created() { // 实例被创建钩子
  },
  computed: {
    // 计算属性
    ...mapState('app',['defaultLogo']),
    searchPlaceholder(){
      return this.searchMethod === '品牌ID' ? '请输入需搜索的品牌ID':'请输入搜索关键词' 
    },
    tminfoimg(){
      return this.tradeInfo.logoUrl?.includes('http') ? this.tradeInfo.logoUrl : this.defaultLogo
    }
  },
  components: {
    // 组件引用
  },
  methods: { 
  
    //获取品牌列表数据
    async getTradeList(curPage = 1){
      this.loading = true
      // 获取品牌列表接口
      this.page = curPage
      let {page ,limit} = this
      let result = await this.$API.trademark.reqTradeMarkList(page,limit)
      // 请求成功
     if(result.code == 200){
       this.total = result.data.total
       this.tradeList = result.data.records
       this.loading = false
     }else{
       this.loading = flase
     }
     
    },
            // 查看详情
    async getTradeInfo(row){
      this.tmLoading = true
      this.tradeInfoVisiable = true
      let res = await this.$API.trademark.searchTradeById(row.id)
      if(res.code ==200){
        this.tradeInfo =  res.data 
        console.log('this.tradeInfo : ', this.tradeInfo );
      }
      this.tmLoading = false
    },
    tradeInfoClose(){
      this.tradeInfoVisiable = false
      this.tradeInfo = {}
    },
    // 页容量改变
    sizeChange(limits){
      this.limit = limits
      this.getTradeList()
    },
    // 关闭对话框
    closeDialog(){
      this.dialogVisible = false 
        // 清空表单验证
      this.$refs.tradeFormRef.resetFields();
      this.tradeForm = {
        tmName:'',
        logoUrl:'',
      }
      console.log(this.tradeForm);

    },
   //添加品牌
   addTradeShow(){
      this.dialogVisible = true
      this.title = '添加品牌'
      console.log('addTradeShow:',this.tradeForm);
   },
   addTradeDone(){
        this.$refs.tradeFormRef.validate( async (valid) =>{
        if(valid){
           this.fullscreenLoading = true
          let res = await this.$API.trademark.reqAddOrReqUpdate(this.tradeForm)
          if(res.code == 200){
            this.$message({
              type:'success',
              message: '添加品牌成功!' 
            })
          }
          this.fullscreenLoading = false
          this.closeDialog()
          this.getTradeList(this.page)
        }
      })
    },
    // 修改品牌
   updateTradeShow(row){
      this.tradeForm = row
      this.dialogVisible = true
       this.title = '修改品牌'
    },
    updateDone(){
        // 表单验证
      this.$refs.tradeFormRef.validate( async (valid) =>{
        if(valid){
         this.fullscreenLoading = true
          let res = await this.$API.trademark.reqAddOrReqUpdate(this.tradeForm)
          this.fullscreenLoading = false
          if(res.code == 200){
            this.$message({
              type:'success',
              message:'修改品牌成功!'
            })
          }
        this.closeDialog()  
        this.getTradeList(this.page)
        }
      })
      
    },
    confirm(){
        if(this.tradeForm.id){
          this.updateDone()
        }else{
          this.addTradeDone()
        }
       
    },
    // 删除品牌
    deleteTradeById(row){
     this.$confirm(`确定删除-
     ${row.tmName} -品牌吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
         let res = await this.$API.trademark.deleteTradeById(row.id)
         if(res.code == 200){
            this.$message({
            type: 'success',
            message: '删除成功！'
          });
          // 判断当前页的数据
          this.getTradeList(this.tradeList.length > 1 ? this.page :this.page - 1)
         }
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
          })
        });
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    handleAvatarSuccess(res) {
      this.tradeForm.logoUrl = res.data
      console.log('res.data: ', res.data);
    },
    // 搜索功能
    async searchDone(){
      let { searchMethod,searchVal } = this
      console.log('searchMethod,searchVal: ', searchMethod,searchVal);
      let res = {}
      if( searchMethod =='关键词'){
       res  = await this.$API.trademark.searchTradeByKeyword(searchVal)
       console.log('res: ', res);
      }else{
        res = await this.$API.trademark.searchTradeById(searchVal)
        this.tradeList = res.data ? [res.data] : []
      }
    }

  },
  mounted() {
    // Dom挂载钩子
    this.getTradeList()
   
  },
  watch: {
    // 监测变化
  },
};
</script>
<style scoped lang="scss">
.Trademark {
  .el-row{
    margin-bottom:15px;
  }
  .el-pagination{
    margin-top:15px;
    text-align: center;
    ::v-deep .btn-prev,
    ::v-deep .btn-next{
      padding :0 5px;
    }
  }
  .logo-img{
    width: 50px;
    height: 50px;
    border-radius: 5px;
    box-shadow: 0 0 3px #ccc;
  }
  ::v-deep .el-upload{
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
    line-height: 148px;
    font-size: 20px;
    .avatar{
      width: 150px;

    }
  }
  .input-with-select{
    width: 600px;
    margin-left:15px;
    .el-select{
      width:100px;
    }
  }
  .el-table ::v-deep .el-table__cell{
    padding:6px 0;
  }
  .edit-tm,.delete-tm,.info-tm{
    padding: 7px 10px;
  }
  .edit-tm{
    background:#f3c526;
    border-color: #f3c526;
  }
  .info-tm{
    background: rgb(194, 202, 212);
    border: rgb(194, 202, 212);
  }
}
</style>
