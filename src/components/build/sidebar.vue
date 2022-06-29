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
      <div class="content f-trans">
        <div class="title">{{ menu.title }}</div>
        <div class="detail">
          <!-- 组件库 -->
          <template v-if="menu.type == 'component'">
            <div
              v-for="(group, groupIndex) in state.componentList"
              :key="groupIndex"
              class="group"
            >
              <div class="title">{{ group.label }}</div>
              <div v-if="group.list?.length" class="list">
                <div
                  v-for="(item, itemIndex) in group.list"
                  :key="`${groupIndex}-${itemIndex}`"
                  class="item f-curp f-trans"
                  @click="
                    onAction({
                      type: menu.type,
                      item,
                      group,
                      itemIndex,
                      groupIndex,
                    })
                  "
                >
                  <ht-image :data="{ url: item.thumbImg }" />
                  <p class="f-mt10 f-tac f-fs12 f-txtell">{{ item.title }}</p>
                </div>
              </div>
              <ht-empty v-else class="list" :data="{ hideImage: true }">
                <template v-slot:content>
                  <p class="f-fs12">暂无物料数据</p>
                </template>
              </ht-empty>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits } from "vue";
import { onGetAllListXhr } from "~/service/material";

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

let state = reactive({
  componentList: [],
});
const onGetComponentList = async () => {
  let res = await onGetAllListXhr();
  state.componentList = res.data?.list;
};
onGetComponentList();

const emit = defineEmits(["onAction"]);
const onAction = (params: any) => {
  emit("onAction", params);
};
</script>

<style lang="less" scoped>
@import "../../static/css/variables.less";
.m-build-sidebar {
  width: @build-sidebar-width;
  height: 100%;
  padding: @padding 0;
  box-sizing: border-box;
  background: @base-color;
  border-right: 1px solid @light-color;
  .menu {
    padding: @padding 0;
    text-align: center;
    .content {
      position: fixed;
      left: @build-sidebar-width;
      top: @build-sidebar-width - 1;
      bottom: 0;
      width: 0;
      opacity: 0;
      background: @base-color;
      overflow-y: scroll;
    }
    .title {
      padding: 0 @padding;
      border-bottom: 1px solid @light-color;
      font-weight: bold;
      line-height: 42px;
      text-align: left;
    }
    .list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      border-right: 1px solid @light-color;
      border-bottom: 1px solid @light-color;
    }
    .item {
      width: 33.3333%;
      padding: @padding * 0.5;
      box-sizing: border-box;
      border-right: 1px solid @light-color;
      &:nth-child(3n) {
        border-right: none;
      }
      &:hover {
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.15);
      }
    }
    &-curr {
      .ht-icon {
        color: @active-color;
      }
      .content {
        width: @sidebar-width;
        opacity: 1;
      }
    }
  }
}
</style>
