<template>
  <div id="SpuForm" class="SpuForm">
    <el-form
      ref="spuFormRef"
      :model="spuForm"
      label-width="80px"
      label-position="right"
    >
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuForm.spuName"
          placeholder="请输入SPU名称"
          class="w400"
        />
      </el-form-item>

      <el-form-item label="品牌">
        <el-select
          v-model="spuForm.tmId"
          placeholder="请选择品牌"
          clearable
          filterable
          class="w400"
          @change="trademarkChange"
        >
          <el-option
            v-for="item in tradeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="品牌描述">
        <el-input
          v-model="spuForm.description"
          type="textarea"
          :rows="3"
          placeholder="请输入品牌描述"
          clearable
          class="w400"
        />
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" class="img-dialog" top="50px">
          <img width="100%" height="100%" :src="dialogImageUrl" alt="">
          <div slot="footer">
            <el-button type="primary" size="small" @click="dialogVisible =false">关闭</el-button>

          </div>
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          v-model="attrIdAndName"
          :placeholder=" `还有 ${noSelectAttrLength} 个销售属性未选择`"
          clearable
          filterable
          style="width:294px"
        >
          <el-option
            v-for="item in noSelectAttr"
            :key="item.id"
            :value="`${item.id}:${item.name}`"
            :label="item.name"
          />
        </el-select>
        <el-button
          type="primary"
          size="small"
          class="add-attr-val"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
        > 添加销售属性</el-button>
      </el-form-item>

      <el-table :data="spuForm.spuSaleAttrList" border stripe style="width:1010px;">
        <el-table-column label="序号" width="80" align="center" type="index" />
        <el-table-column label="属性名" width="140" prop="saleAttrName" align="center" />
        <el-table-column label="属性值名称列表">
          <template slot-scope="{ row, index }">
            <el-tag
              v-for="item in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              :disable-transitions="false"
              @close="handleClose(item,row)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisible"
              ref="saveTagInput"
              v-model="row.inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="{row,$index}">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAttr(row,$index)" />

          </template>
        </el-table-column>
      </el-table>

      <el-form-item>
        <el-button
          type="primary"
          style="margin-top: 15px"
          size="small"
          @click="onSubmit"
        >保存</el-button>
        <el-button
          size="small"
          @click="cancel"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  components: {
    // 组件引用
  },
  props: {
    // 父传子
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      inputVisible: false,
      inputValue: '',
      spuForm: {
        category3Id: '',
        spuName: '',
        tmId: '',
        description: '',
        apuSaleAttr: '',
        spuImageList: [],
        spuSaleAttrList: []
      },
      attrIdAndName: '',
      // 请求到的数据
      spuData: [],
      tradeMarkList: [],
      spuSaleAttrList: [],
      spuImageList: [],
      spuId: ''
      // 添加SPU

    }
  },
  computed: {
    // 计算未选择销售属性数组
    noSelectAttr() {
      // 过滤
      const noSelectList = this.spuSaleAttrList.filter(item => {
        return this.spuForm.spuSaleAttrList.every(item1 => {
          return item.name !== item1.saleAttrName
        })
      })
      return noSelectList
    },
    // 计算未选择销售属性数组长度
    noSelectAttrLength() {
      return this.noSelectAttr.length
    }

  },
  watch: {
  },
  created() {
    // 实例被创建钩子
  },
  mounted() {
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 照片墙移除
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    // 照片墙上传成功
    handleAvatarSuccess(response, file, fileList) {
      //  fileList[fileList.length-1].url = response.data
      this.spuImageList = fileList
    },

    //   获取品牌信息方法====
    async getTrademarkList() {
      const res = await this.$API.trademark.reqTrademarkList()
      if (res.code == 200) {
        this.tradeMarkList = res.data
      }
    },
    //   获取全平台销售属性方法
    async getBaseSaleAttrList() {
      const res = await this.$API.spu.reqBaseSaleAttrList()
      if (res.code == 200) {
        this.spuSaleAttrList = res.data || []
      }
    },

    //   获取SPU信息方法
    async getSpuById(spuId) {
      const res = await this.$API.spu.reqSpuById(spuId)
      if (res.code == 200) {
        this.spuForm = res.data || []

        this.$notify({
          title: '请求成功！',
          type: 'success'
        })
      }
    },
    //   获取SPU图片方法
    async getSpuImageList(spuId) {
      const res = await this.$API.spu.reqSpuImageList(spuId)
      if (res.code == 200) {
        const imageList = res.data || []

        imageList.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = imageList || []
      }
    },
    // 品牌选择值改变
    trademarkChange(val) {
      this.spuForm.tmId = val
    },
    // 添加SPU接口调用
    addSpuShow(cate3Id) {
      this.spuForm.category3Id = cate3Id
      // 1. 获取品牌信息
      this.getTrademarkList()
      // 2.   获取全平台销售属性
      this.getBaseSaleAttrList()
    },
    // 修改SPU接口调用
    editSpuShow(spuId) {
      this.spuId = spuId
      this.getSpuById(spuId)
      this.getSpuImageList(spuId)
      this.getTrademarkList()
      this.getBaseSaleAttrList()
    },

    // 标签且为输入框回调方法
    showInput(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 标签关闭移除
    handleClose(tag, row) {
      const { spuSaleAttrValueList } = row
      spuSaleAttrValueList.splice(spuSaleAttrValueList.indexOf(tag), 1)
    },
    // 输入框输入完成、失去焦点回调方法
    handleInputConfirm(row) {
      row.inputVisible = false
      const { baseSaleAttrId, inputValue } = row
      //  属性值不能为空
      if (inputValue?.trim() == '') {
        this.$message({
          type: 'warning',
          message: '属性值不能为空！'
        })
        this.inputValue = ''
        return
      }
      //  属性值不能重复
      const isRepeat = row.spuSaleAttrValueList.every(item =>
        item.saleAttrValueName !== inputValue
      )
      if (!isRepeat) {
        this.$message({
          type: 'warning',
          message: '属性值不能重复！'
        })
        this.inputValue = ''
        return
      }
      const newAttrVal = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newAttrVal)
      row.inputValue = ''
    },
    // 添加销售属性
    addSaleAttr() {
      // 收集销售属性
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      const newAttrObj = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spuForm.spuSaleAttrList.push(newAttrObj)
      this.attrIdAndName = ''
    },
    deleteAttr(row, index) {
      this.spuForm.spuSaleAttrList.splice(index, 1)
    },
    // 处理图片数据
    doImageData() {
      this.spuForm.spuImageList = this.spuImageList.map(item => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url
        }
      })
    },
    // 提交数据
    async onSubmit() {
      let res = {}
      if (this.spuId) {
        res = await this.$API.spu.updateSpuInfo(this.spuForm)
      } else {
        res = await this.$API.spu.saveSpuInfo(this.spuForm)
      }
      if (res.code == 200) {
        this.$notify({
          type: 'success',
          title: '保存成功！'
        })
        this.$emit('changeSence', '1')
      }
      Object.assign(this._data, this.$options.data())
    },
    cancel() {
      this.$emit('changeSence', '1')
      // 清空表单
      Object.assign(this._data, this.$options.data())
    }

  }
}
</script>
<style scoped lang="scss">
.SpuForm {
  .w400 {
    width: 400px;
  }
}

// 标签
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .img-dialog ::v-deep .el-dialog__body{
      padding:10px;
  }
  .add-attr-val{
    margin-left: 20px;
    padding:9px 6px;
  }
</style>
