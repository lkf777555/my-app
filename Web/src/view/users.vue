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
        <el-button type="primary" @click="onAdd">添加用户</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-loading="loading"
        :data="tableData.value"
        style="width: 100%"
        :stripe="true"
      >
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="mailbox" label="邮箱" align="center" />
        <el-table-column prop="Telephone" label="电话" align="center" />
        <el-table-column prop="role" label="角色" align="center">
          <template #default="scope">
            <el-tag>{{ scope.row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template #default="scope">
            <el-switch
              @change="upState(scope.row)"
              v-model="scope.row.state"
              class="ml-2"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
          /></template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="handleClick(scope.row)"
              >删除</el-button
            >
            <el-button type="primary" size="small" @click="edit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-in">
      <el-dialog
        :close-on-click-modal="false"
        v-model="dialogFormVisible"
        :title="editTitle"
      >
        <el-form :rules="rules" :model="form" ref="formmodel">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="邮箱" prop="mailbox">
            <el-input v-model="form.mailbox" />
          </el-form-item>
          <el-form-item label="电话" prop="Telephone">
            <el-input v-model="form.Telephone" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select
              v-model="form.role"
              class="m-2"
              placeholder="请选择角色"
              size="large"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="AddForm(formmodel)"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { user, list, del, update } from '../Api/login'
import TagViewVue from '../components/TagView.vue'
import { Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
let loading = ref(true)
const SearchVal = ref()
const formmodel = ref()
let editTitle = ref('')
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
let form = reactive({
  name: '',
  mailbox: '',
  Telephone: '',
  role: '',
  state: false,
})
const options = [
  {
    value: '坤坤真爱粉',
    label: '坤坤真爱粉',
  },
  {
    value: '纯纯小黑子',
    label: '纯纯小黑子',
  },
]
const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  mailbox: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  Telephone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  role: [{ required: true, message: '请输入角色', trigger: 'blur' }],
})

// 获取数据
const getList = async () => {
  const { data: res } = await list()
  tableData.value = res
  loading = false
}
//页面初始调用
getList()
//点击添加按钮
const onAdd = () => {
  editTitle = '添加用户'
  dialogFormVisible.value = true
}
//搜索
const SearchAdd = () => {
  console.log(SearchVal.value)
}
//删除
const handleClick = (row) => {
  ElMessageBox.confirm('您确定要删除吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      del(row._id).then((res) => {
        if (res.code == 1) {
          getList()
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
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '用户取消删除',
      })
    })
}
//添加
const AddForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (editTitle == '添加用户') {
        user(form).then((res) => {
          if (res.code == 1) {
            dialogFormVisible.value = false
            getList()
            formmodel.value.resetFields()
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
        })
      } else if (editTitle == '编辑用户') {
        update(form).then((res) => {
          if (res.code == 1) {
            dialogFormVisible.value = false
            getList()
            form = reactive({
              name: '',
              mailbox: '',
              Telephone: '',
              role: '',
              state: false,
            })
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
        })
      }
    }
  })
}
//更新
const upState = async (val) => {
  const res = await update(val)
  if (res.code == 1) {
    getList()
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
//编辑
const edit = (val) => {
  editTitle = '编辑用户'
  dialogFormVisible.value = true
  form = reactive(JSON.parse(JSON.stringify(val)))
}
// 取消
const cancel = () => {
  dialogFormVisible.value = false
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
