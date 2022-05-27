<template>
  <div id="attribute" class="attribute">
    <el-card>
      <CategorySelect :show="showEdit" @getCateIds="getCateIdsDone" />
    </el-card>
    <el-card>
      <div v-show="!showEdit" class="attr-table">
        <el-button class="add-attr" type="primary" size="small" :disabled="addAttrInfoEnable" @click="addAttrShow">添加属性</el-button>
        <!-- 表格 -->
        <el-skeleton style="width:100%" :loading="loading" animated :count="11">
          <el-table
            :data="attrInfoList"
            border
            stripe
            height="calc(100vh - 230px)"
            style="width: 100%"
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{textAlign:'center'}"
          >
            <el-table-column prop="id" label="序号" width="140" sortable />
            <el-table-column prop="attrName" label="属性名称" width="140" />
            <el-table-column prop="attrValueList" label="属性值列表">
              <template slot-scope="{row,$index}">
                <el-tag v-for="item in row.attrValueList" type="success" size="small">{{ item.valueName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="categoryId" label="分类ID" width="140" />
            <el-table-column prop="categoryLevel" label="分类级别" width="140" />
            <el-table-column label="操作" width="280">
              <template slot-scope="{row}">
                <el-button size="mini" type="warning" icon="el-icon-edit" @click="updateAttrShow(row)" />
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteAttrById(row)" />
              </template>

            </el-table-column>
          </el-table>
        </el-skeleton>
      </div>

      <!-- 添加or修改区域 -->
      <div v-show="showEdit" class="editAttr">
        <el-form ref="editFormRef" :model="editForm" label-width="80px" :inline="false" size="normal">
          <el-form-item label="属性名称" prop="attrName">
            <el-input v-model="editForm.attrName" placeholder="请输入属性名称" class="arrtname" />
          </el-form-item>
          <!-- 添加属性值 -->
          <el-button type="primary" size="small" :disabled="addAttrValEnable" style="margin-bottom:15px;" @click="addAttrVal">添加属性值</el-button>
          <el-table
            :data="editForm.attrValueList"
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{textAlign:'center'}"
            border
            stripe
          >
            <el-table-column
              label="序号"
              prop="id"
              width="150"
            />
            <el-table-column
              label="属性ID"
              prop="attrId"
              width="150"
            />
            </el-table-column>
            <el-table-column
              label="属性值"
              prop="valueName"
            >
              <template slot-scope="{row,$index}">
                <el-input
                  v-if="row.flag"
                  :ref="$index"
                  v-model="row.valueName"
                  placeholder="请输入属性值"
                  size="mini"
                  clearable
                  @keyup.native.enter="attrValEditDone(row)"
                  @blur="attrValEditDone(row)"
                />
                <span v-else class="attrval" @click="attrValEdit(row,$index)">{{ row.valueName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="{row,$index}">
                <el-popconfirm
                  :title="`确定删除${row.valueName}吗？`"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  confirm-button-type="primary"
                  cancel-button-type="text"
                  icon="el-icon-question"
                  icon-color="#f90"
                  :hide-icon="false"
                  @confirm="confirmDelete($index)"
                  @cancel="cancelDelete"
                >
                  <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" />
                </el-popconfirm>

              </template>

            </el-table-column>
          </el-table>

          <el-form-item>
            <el-button size="small" type="primary" style="margin-top:15px;" :disabled="this.editForm.attrValueList.length < 1" @click="saveAttrInfo">保存</el-button>
            <el-button size="small" @click="cancelSave">取消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attribute',
  components: {
    // 组件引用
    CategorySelect: () => import('@/components/CategorySelect')
  },
  props: {
    // 父传子
  },
  data() {
    return {
      cates: {},
      attrInfoList: [],
      page: 1,
      limit: 7,
      total: 0,
      loading: false, // 骨架屏控制
      showEdit: false,
      attrValEmpty: false, // 属性值为空标记
      // 添加属性表单
      editForm: {
        attrName: '',
        attrValueList: [],
        categoryId: 0, // 三级分类id
        categoryLevel: 3 // 分类级别
      },
      editFormRules: {
        attrName: [
          { required: true, message: '请输入属性名称', trigger: 'change' },
          { min: 2, max: 8, message: '请输入2-8字符属性名称', trigger: 'change' }
        ]
      }

    }
  },
  computed: {
    // 计算属性
    addAttrInfoEnable() {
      return this.cate3Id == ''
    },
    addAttrValEnable() {
      // 验证属性名称输入框
      return (this.editForm.attrName.trim() == '')
    }
  },
  watch: {
    // 监测变化
  },
  created() {
    // 实例被创建钩子
  },
  mounted() {
    // Dom挂载钩子
    const defaultCates = {
      cate1Id: 2,
      cate2Id: 13,
      cate3Id: 61
    }
    this.getCateIdsDone(defaultCates)
  },
  methods: {
    // 三级分类组件传过来的分类数据
    async getCateIdsDone(cates) {
      this.cates = cates
      const { cate1Id, cate2Id, cate3Id } = cates
      if (cates.cate3Id) {
        const res = await this.$API.attribute.getAttrInfoList(cate1Id, cate2Id, cate3Id)
        if (res.code == 200) {
          this.attrInfoList = res.data || []
        }
      }
    },
    // 添加or修改属性界面展示
    addAttrShow() {
      this.showEdit = true
      // 清空编辑界面数据，并收集数据
      this.editForm = {
        attrName: '',
        attrValueList: [],
        categoryId: this.cates.cate3Id, // 三级分类id
        categoryLevel: 3 // 分类级别
      }
    },
    // 修改属性
    updateAttrShow(row) {
      this.showEdit = true
      this.editForm = cloneDeep(row)

      // 添加flag
      this.editForm.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
    }, // 删除属性
    deleteAttrById(row) {
      this.$confirm('确定删除* ' + row.attrName + ' *属性？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await this.$API.attribute.attrDeleteById(row.id)
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getCateIdsDone(this.cates)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 保存提交
    async saveAttrInfo() {
      // 整理参数：属性值为空不提交
      this.editForm.attrValueList.filter((item) => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })
      const res = await this.$API.attribute.setAttrInfo(this.editForm)
      if (res.code == 200) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.showEdit = false
        this.getCateIdsDone(this.cates)
      }
    },
    // 取消保存属性
    cancelSave() {
      this.showEdit = false
      this.$refs.editFormRef.resetFields()
    },
    // 添加属性值
    addAttrVal() {
      const addAttrVal = {
        attrId: this.editForm.id,
        valueName: '',
        flag: true
      }
      this.$nextTick(() => {
        // 获取新增的input索引
        const index = this.editForm.attrValueList.length - 1
        this.$nextTick(() => {
        // 获取新增input自动聚焦
          this.$refs[index].focus()
        })
      })
      this.editForm.attrValueList.push(addAttrVal)
    },

    // 点击编辑属性值span标签
    attrValEdit(row, index) {
      row.flag = true
      // 确保input已经存在
      this.$nextTick(() => {
        // 获取input自动聚焦
        this.$refs[index].focus()
      })
    },
    attrValEditDone(row) {
      // 去除空字符
      if (row.valueName.trim() == '') {
        this.$message({
          message: '输入的属性值不能为空！',
          type: 'warning'
        })
        return
      }
      // 判断添加的属性值是否重复
      const isRepeat = this.editForm.attrValueList.some((item) => {
        if (item != row) {
          return item.valueName == row.valueName
        }
      })
      if (isRepeat) {
        this.$message({
          message: '输入的属性值不能重复！',
          type: 'warning'
        })
        return
        return
      }
      row.flag = false
    },
    // 确定删除属性值
    confirmDelete(index) {
      this.editForm.attrValueList.splice(index, 1)
    },
    // 取消删除属性值
    cancelDelete() {
      this.$message({
        type: 'info',
        message: '已取消删除操作!'
      })
    }
  }

}
</script>
<style scoped lang="scss">
.attribute {
  .el-card:first-of-type {
    margin-bottom: 15px;
  }
  .el-tag+.el-tag{
    margin-left:5px;
    margin-bottom:5px;
  }
  .el-button.add-attr{
    margin-bottom: 10px;
  }
  .arrtname{
    width: 350px;
  }
  .attrval{
    display: block;
  }
}
</style>
