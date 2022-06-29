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
  background: @lighter-color;
  .g-main {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 56px);
  }
  .m-main {
    flex: 1;
    margin: 15px 20px;
  }
  .m-box {
    display: flex;
    flex-direction: column;
    height: calc(100% - 45px);
    padding: 20px;
    box-sizing: border-box;
    background: @base-color;
    overflow-y: auto;
  }
}
</style>
