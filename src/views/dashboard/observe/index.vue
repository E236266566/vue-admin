<template>
  <div class="observe">
    <el-row :gutter="10">
      <el-col :span="12">
        <search></search>
      </el-col>
      <el-col :span="12"> <category></category> </el-col>
    </el-row>
  </div>
</template>

<script>
import search from '@/views/dashboard/observe/search/index.vue'
import category from '@/views/dashboard/observe/category/index.vue'
export default {
  name: '',
  components: {
    search,
    category
  }
}
</script>

<style scoped lang="scss"></style>
