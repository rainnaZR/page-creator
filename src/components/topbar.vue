<template>
  <div class="m-topbar">
    <!-- logo -->
    <div class="f-df f-aic f-curp" @click="onClickLogo">
      <ht-image :data="logoData" />
      <h1 class="f-ml10 f-fs16 s-fc0">{{ logoData.alt }}</h1>
    </div>

    <div class="f-f1 tools">
      <!-- 全屏操作 -->
      <ht-tooltip
        :data="{ popContent: `${isFullScreen ? '退出全屏' : '全屏'}` }"
      >
        <ht-icon
          class="item f-trans f-curp"
          :data="{
            name: isFullScreen ? 'u-icon-exitFullScreen' : 'u-icon-fullScreen',
          }"
          @on-click="onFullScreen"
        />
      </ht-tooltip>
      <!-- 退出登录 -->
      <div class="item f-ml20 f-trans f-curp" @click="onLoginOut">退出登录</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { indexPath } from "~/store/base";
import { dom } from "@htfed/utils";

// logo
const $router = useRouter();
const logoData = {
  height: 36,
  src: "/logo.png",
  alt: "页面搭建系统",
};
const onClickLogo = () => $router.push(indexPath.value);

// 全屏
const isFullScreen = ref(dom.onIsFullScreen());
const onFullScreen = () => {
  isFullScreen.value ? dom.onExitFullScreen() : dom.onRequestFullScreen();
  isFullScreen.value = !isFullScreen.value;
};
const onResize = () => {
  isFullScreen.value = dom.onIsFullScreen();
};
onMounted(() => {
  window.addEventListener("resize", onResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

// 退出登录
const { $dialog } = getCurrentInstance()?.proxy;
const onLoginOut = () => {
  $dialog.show({
    title: "提示",
    content: "确认退出重新登录吗？",
    onConfirm: () => {
      $router.push("/login");
    },
  });
};
</script>

<style lang="less" scoped>
@import "../static/css/variables.less";
.m-topbar {
  display: flex;
  align-items: center;
  padding: @topbar-padding;
  box-sizing: border-box;
  background: @normal-color;
  color: fade(@base-color, 75);
  .tools {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .item:hover {
    color: @base-color;
  }
}
</style>
