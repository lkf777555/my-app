<template>
  <div class="tagview">
    <div style="height: 30px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ nameArr.name1 }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ nameArr.name2 }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-left: -4px">
      <el-tag
        style="margin: 4px"
        v-for="(item, index) in info"
        :key="item.name"
        class="mx-1"
        :closable="item.path === '/home' ? false : true"
        size="large"
        effect="dark"
        @click="tagPush(item.path)"
        @close="tagDel(index)"
        disable-transitions
      >
        {{ item.name }}
      </el-tag>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
const Route = useRoute()
const Router = useRouter()
const store = useStore()
const Path = { name: Route.meta.title, path: Route.path }
store.dispatch('Addview', Path)

const info = computed(() => {
  return store.state.tagList
})

const nameArr = computed(() => {
  return store.state.Bard
})

const tagPush = (path) => {
  Router.push(path)
}
const tagDel = (index) => {
  store.dispatch('TagDel', index)
}
</script>
<style lang="scss" scoped></style>
