<template>
  <div class="g-page">
    <!-- 顶栏 -->
    <Topbar />

    <!-- 主体 -->
    <div class="g-main">
      <!-- 边栏 -->
      <Sidebar />

      <!-- 内容 -->
      <div class="m-main f-f1">
        <!-- 面包屑 -->
        <ht-bread-crumb :data="breadCrumbData" />

        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { currentMenuInfo } from "~/store/base";
import Topbar from "@/topbar.vue";
import Sidebar from "@/sidebar.vue";

const breadCrumbData = computed(() => ({
  list: currentMenuInfo.value?.map((i: any) => ({
    name: i.label,
  })),
}));
</script>

<style lang="less" scoped>
.g-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #eef0f6;
  .g-main {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
}
</style>
