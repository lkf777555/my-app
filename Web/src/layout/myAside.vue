<template>
  <div class="home-top">
    <el-menu
      router
      :unique-opened="true"
      :default-active="Route.path"
      class="el-menu-vertical-demo"
    >
      <el-menu-item :index="menusPath">
        <span>{{ menusTitle }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="index + ''"
        v-for="(item, index) in menusListchildren.value"
        :key="index"
      >
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group
          v-for="(inm, idx) in item.children"
          :key="idx"
          @click="addBard(item.meta.title, inm.meta.title)"
        >
          <el-menu-item :index="inm.path">{{ inm.meta.title }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { menus } from '../../src/Api/login'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const Route = useRoute()
let menusTitle = ref()
let menusPath = ref()
let menusListchildren = reactive([])
menus().then((res) => {
  menusTitle = res.data.routes.meta.title
  menusPath = res.data.routes.path
  menusListchildren.value = res.data.routes.children
})
const addBard = (name1, name2) => {
  store.dispatch('AddBard', { name1: name1, name2: name2 })
}
</script>
<style lang="scss" scoped>
.el-menu {
  background-image: linear-gradient(to right, #f9e6bd, #d1fdff);
}
::v-deep .el-menu-item-group__title {
  padding: 0px;
}
::v-deep .el-menu-item {
  background-image: linear-gradient(to right, #f9e6bd, #d1fdff);
}
</style>
