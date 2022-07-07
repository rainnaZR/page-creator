<template>
  <div class="m-build">
    <!-- 顶栏 -->
    <Topbar @onAction="onTopbarAction" />

    <!-- 主体 -->
    <div class="main">
      <!-- 边栏 -->
      <Sidebar @onAction="onSidebarAction" />
      <!-- 视图 -->
      <Viewer class="f-f1" />
      <!-- 工具栏 -->
      <Toolbar :config="state.currMaterial" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Topbar from "@/build/topbar.vue";
import Sidebar from "@/build/sidebar.vue";
import Toolbar from "@/build/toolbar.vue";

const state = reactive({
  currMaterial: {},
});
const onTopbarAction = (params: any) => {
  alert(`${params.type}事件点击`);
};
const onSidebarAction = (params: any) => {
  state.currMaterial = params.item;
};
</script>

<style lang="less" scoped>
@import "../../../static/css/variables.less";
.m-build {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: @lighter-color;
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
