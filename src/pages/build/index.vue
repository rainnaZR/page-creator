<template>
  <div class="m-build">
    <!-- 顶栏 -->
    <Topbar @onAction="onTopbarAction" />

    <!-- 主体 -->
    <div class="g-main">
      <!-- 边栏 -->
      <Sidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Topbar from "@/build/topbar.vue";
import Sidebar from "@/build/sidebar.vue";

const onTopbarAction = (params) => {
  alert(`${params.type}事件点击`);
};
</script>
