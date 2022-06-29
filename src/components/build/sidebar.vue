<template>
  <div class="m-build-sidebar">
    <div
      v-for="(menu, index) in menuList"
      :key="index"
      class="menu"
      :class="{ 'menu-curr': currMenuType == menu.type }"
    >
      <!-- 图标 -->
      <ht-tooltip :data="{ position: 'right-center', popContent: menu.title }">
        <ht-icon
          class="f-curp f-trans"
          :data="{ name: menu.iconName }"
          @click="onClickMenu(menu.type)"
        />
      </ht-tooltip>

      <!-- 内容 -->
      <div class="content f-trans">{{ menu.type }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const menuList = reactive([
  {
    type: "component",
    title: "组件库",
    iconName: "u-icon-notice",
  },
  {
    type: "template",
    title: "模板库",
    iconName: "u-icon-finance",
  },
]);
const currMenuType = ref("");

const onClickMenu = (type: string) => {
  currMenuType.value = currMenuType.value == type ? "" : type;
};
</script>

<style lang="less" scoped>
@import "../../static/css/variables.less";
.m-build-sidebar {
  width: @build-sidebar-width;
  height: 100%;
  padding: @topbar-padding 0;
  box-sizing: border-box;
  background: @base-color;
  border-right: 1px solid @light-color;
  .menu {
    padding: @topbar-padding 0;
    text-align: center;
    .content {
      position: fixed;
      left: @build-sidebar-width;
      top: @build-sidebar-width;
      bottom: 0;
      width: 0;
      background: @base-color;
      overflow-y: scroll;
    }
    &-curr {
      .ht-icon {
        color: @active-color;
      }
      .content {
        width: @sidebar-width;
      }
    }
  }
}
</style>
