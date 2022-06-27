<template>
  <div class="m-build-topbar">
    <!-- logo -->
    <div class="f-df f-aic f-curp" @click="onClickLogo">
      <ht-image :data="logoData" />
      <h1 class="f-ml10 f-fs16">{{ logoData.alt }}</h1>
    </div>

    <!-- 行动点 -->
    <ht-action class="actions f-f1" :data="actionData" @on-action="onAction" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, reactive } from "vue";
import { useRouter } from "vue-router";
import { indexPath } from "~/store/base";

const $router = useRouter();
const emit = defineEmits(["onAction"]);

// logo
const logoData = {
  height: 36,
  src: "/logo.png",
  alt: "页面搭建系统",
};
const onClickLogo = () => $router.push(indexPath.value);

// action
const actionData = reactive({
  hideLine: true,
  list: [
    {
      type: "undo",
      btnType: "text",
      size: "mini",
      content: "撤销",
    },
    {
      type: "redo",
      btnType: "text",
      size: "mini",
      content: "重做",
    },
    {
      type: "clear",
      btnType: "primary",
      size: "mini",
      content: "清空",
      icon: "u-icon-error",
    },
    {
      type: "preview",
      btnType: "warning",
      size: "mini",
      content: "页面预览",
      icon: "u-icon-preview",
    },
    {
      type: "previewTree",
      btnType: "warning",
      size: "mini",
      content: "组件树预览",
      icon: "u-icon-preview",
    },
    {
      type: "save",
      btnType: "success",
      size: "mini",
      content: "仅保存",
      icon: "u-icon-arrowsDown",
    },
    {
      type: "saveAndPublish",
      btnType: "success",
      size: "mini",
      content: "保存并发布",
      icon: "u-icon-success",
    },
    {
      type: "publish",
      btnType: "success",
      size: "mini",
      content: "仅发布",
      icon: "u-icon-select",
    },
    {
      type: "importConfig",
      btnType: "default",
      size: "mini",
      content: "导入配置文件",
    },
    {
      type: "exportConfig",
      btnType: "default",
      size: "mini",
      content: "导出配置文件",
    },
    {
      type: "exportCode",
      btnType: "default",
      size: "mini",
      content: "导出代码",
    },
    {
      type: "exportSFC",
      btnType: "default",
      size: "mini",
      content: "导出组件",
    },
  ],
});
const onAction = (params: any) => {
  emit("onAction", params);
};
</script>

<style lang="less" scoped>
.m-build-topbar {
  display: flex;
  padding: 5px;
  background: #fff;
  .actions {
    justify-content: flex-end;
  }
}
</style>
