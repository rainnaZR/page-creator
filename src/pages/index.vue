<template>
  <div class="g-page">
    <!-- 顶栏 -->
    <Topbar />

    <!-- 主体 -->
    <div class="g-main">
      <!-- 边栏 -->
      <Sidebar />

      <!-- 内容 -->
      <div class="m-main">
        <!-- 面包屑 -->
        <ht-bread-crumb class="f-mb15" :data="breadCrumbData" />

        <div class="m-box">
          <router-view />
        </div>
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
@import "../static/css/variables.less";
.g-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #eef0f6;
  .g-main {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .m-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 15px 20px;
  }
  .m-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 15px;
    background: @base-color;
    box-shadow: 0px 0px 6px 0px @light-color;
  }
}
</style>
