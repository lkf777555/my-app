<template>
  <div class="index">
    <div class="common-layout">
      <el-container>
        <el-header><myHeader /></el-header>
        <el-container>
          <el-aside><myAside /></el-aside>
          <el-main><myMain /></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import myAside from './myAside.vue'
import myHeader from './myHeader.vue'
import myMain from './myMain.vue'
</script>
<style lang="scss" scoped>
.el-aside {
  width: 15%;
  height: 100vh;
  background-image: linear-gradient(to right, #f9e6bd, #d1fdff);
}
.el-header {
  padding: 0px;
}

.el-main {
  background-color: #f2f0f0;
}
</style>
