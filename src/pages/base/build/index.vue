<template>
  <div class="m-build">
    <!-- 顶栏 -->
    <Topbar :config="DESIGNER.topbarConfig" @onAction="onTopbarAction" />

    <!-- 主体 -->
    <div class="main">
      <!-- 边栏 -->
      <Sidebar :config="DESIGNER.sidebarConfig" @onAction="onSidebarAction" />
      <!-- 视图 -->
      <Viewer ref="viewerRef" class="f-f1" />
      <!-- 工具栏 -->
      <Toolbar ref="toolbarRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DESIGNER } from "~/static/constants/designer";
import Topbar from "@/build/topbar.vue";
import Sidebar from "@/build/sidebar.vue";
import Viewer from "@/build/viewer.vue";
import Toolbar from "@/build/toolbar.vue";

const viewerRef = ref<HTMLElement | null>(null);
const toolbarRef = ref<HTMLElement | null>(null);

const onTopbarAction = (params: any) => {
  alert(`${params.type}事件点击`);
};

const onSidebarAction = (params: any) => {
  // 右侧工具栏设置更新
  toolbarRef.value?.onLoad({
    config: params.item,
    data: {},
  });
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
