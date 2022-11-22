<template>
  <div class="login-top">
    <div class="login-title">基于Vite+Vue3+Node.js开发的后台管理系统</div>
    <div class="login-form">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="form-content"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 400px"
            type="primary"
            @click="loginFrom(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { login } from '../Api/login'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const Router = useRouter()
const ruleForm = reactive({
  username: 'admin',
  password: '123456',
}) // 定义form内容
const ruleFormRef = ref() //定义ref
const rules = reactive({
  //表单正则
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '字符长度 3 - 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 6, message: '字符长度 3 - 6', trigger: 'blur' },
  ],
})
const loginFrom = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(ruleForm).then((res) => {
        if (res.code == 1) {
          localStorage.setItem('Token', res.token)
          Router.push('/home')
          ElNotification({
            title: '登录成功',
            message: `${res.msg}`,
            type: 'success',
          })
        } else {
          ElNotification({
            title: '登录失败',
            message: `${res.msg}`,
            type: 'error',
          })
        }
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.login-top {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #f9e6bd, #d1fdff);
  position: relative;
  .login-title {
    position: fixed;
    bottom: 0px;
    right: 10px;
    font-size: 30px;
    color: #fddb92;
  }
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-60%, -50%);
    .form-content {
      width: 400px;
      height: 160px;
    }
  }
}
</style>
