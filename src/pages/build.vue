<template>
  <div class="g-page">
    <!-- 顶栏 -->
    <Topbar />

    <!-- 主体 -->
    <div class="g-main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Topbar from "@/topbar.vue";
</script>

<style lang="less" scoped>
.g-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #eef0f6;
  .g-main {
    flex: 1;
    overflow: hidden;
  }
}
</style>
