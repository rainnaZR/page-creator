<template>
  <div class="m-sidebar">
    <ht-tab
      v-model:modelValue="currTabValue"
      :data="tabData"
      @on-change="onClickTab"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { menuInfo, setMenuInfo, setCurrentMenuInfo } from "~/store/base";
import { onGetMenuInfoXhr } from "~/service/base";

const $router = useRouter();
const $route = useRoute();
const onInitMenuInfo = async () => {
  if (menuInfo.value && menuInfo.value.length) return;
  let res = await onGetMenuInfoXhr();
  setMenuInfo(res?.data?.list);
};
onInitMenuInfo();

// tab
const tabData = computed(() => ({
  direction: "column",
  list: menuInfo.value,
}));
// 当前选中tab值
const currTabValue = computed(() => {
  let path: string = $route.path;
  let tabValue: number[] = [];
  let currentMenuInfo: any[] = [];
  const traverse = (result: any) => {
    if (!result || !result.length) return;
    let index = result.findIndex((i: any) => path.startsWith(i.value));
    if (index > -1) {
      const menu = result[index];
      tabValue.push(menu.value);
      currentMenuInfo.push(menu);
      if (menu.children) traverse(menu.children);
    }
  };
  traverse(menuInfo.value);
  setCurrentMenuInfo(currentMenuInfo);
  return tabValue;
});
// tab点击
const onClickTab = (tab: any, indexArr: number[]) => {
  // 点击带二级tab的一级tab，不跳转页面
  if (tab.children && indexArr.length == 1) return;
  $router.push(tab.value);
};
</script>

<style lang="less" scoped>
@import "../static/css/variables.less";
.m-sidebar {
  width: @sidebar-width;
  height: 100%;
  background: @base-color;
  border-right: 1px solid @light-color;
  overflow-y: auto;
}
</style>
