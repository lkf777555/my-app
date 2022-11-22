<template>
  <div class="users">
    <TagViewVue />
    <div class="search-top">
      <div class="mt-4" style="width: 360px">
        <el-input v-model="SearchVal" placeholder="请输入内容">
          <template #append>
            <el-button :icon="Search" @click="SearchAdd" />
          </template>
        </el-input>
      </div>
      <div>
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加用户</el-button
        >
      </div>
    </div>
    <div class="table-content">
      <el-table :data="tableData.value" style="width: 100%" :stripe="true">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="mailbox" label="邮箱" />
        <el-table-column prop="Telephone" label="电话" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.state"
              class="ml-2"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
          /></template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="handleClick(scope.row)"
              >删除</el-button
            >
            <el-button type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-in">
      <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <el-form :model="form">
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.mailbox" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.Telephone" />
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="form.role" />
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.state"
              class="ml-2"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="AddForm"> 添加 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { user, list } from '../Api/login'
import TagViewVue from '../components/TagView.vue'
import { Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
const SearchVal = ref()
const dialogFormVisible = ref(false)
const tableData = reactive([
  {
    name: '',
    mailbox: '',
    Telephone: '',
    role: '',
    state: '',
  },
])
const form = reactive({
  name: '',
  mailbox: '',
  Telephone: '',
  role: '',
  state: false,
})
// 获取数据
const getList = async () => {
  const { data: res } = await list()
  tableData.value = res
}
//页面初始调用
getList()
//搜索
const SearchAdd = () => {
  console.log(SearchVal.value)
}
//删除
const handleClick = (row) => {
  console.log(row)
}
//添加
const AddForm = async () => {
  dialogFormVisible.value = false
  const res = await user(form)
  getList()
  if (res.code == 1) {
    ElNotification({
      message: `${res.msg}`,
      type: 'success',
    })
  } else {
    ElNotification({
      message: `${res.msg}`,
      type: 'error',
    })
  }
}
</script>
<style lang="scss" scoped>
.users {
  width: 100%;
  height: 100%;
  background-color: white;
}
.search-top {
  width: 480px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table-content {
  margin-top: 10px;
}
</style>
