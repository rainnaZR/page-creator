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
        <div class="title title-1">{{ menu.title }}</div>
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
                  :class="{
                    'item-curr':
                      state.currentActionId == `${menu.type}_${item.id}`,
                  }"
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
                  <ht-image :data="{ src: item.thumbImg }" />
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

          <!-- 模板库 -->
          <template v-if="menu.type == 'template'">
            <div v-if="state.templateList?.length" class="list">
              <div
                v-for="(item, itemIndex) in state.templateList"
                :key="itemIndex"
                class="item item-1 f-curp f-trans"
                :class="{
                  'item-curr':
                    state.currentActionId == `${menu.type}_${item.id}`,
                }"
                @click="
                  onAction({
                    type: menu.type,
                    item,
                    itemIndex,
                  })
                "
              >
                <ht-image :data="{ src: item.thumbImg }" />
                <p class="f-mt10 f-tac f-fs12 f-txtell">{{ item.title }}</p>
              </div>
            </div>
            <ht-empty v-else class="list" :data="{ hideImage: true }">
              <template v-slot:content>
                <p class="f-fs12">暂无模板数据</p>
              </template>
            </ht-empty>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { onGetAllListXhr } from "~/service/material";

const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
});
const menuList = [
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
].filter((i) => props.config?.menus?.includes(i.type));
const currMenuType = ref("");
const onClickMenu = (type: string) => {
  currMenuType.value = currMenuType.value == type ? "" : type;
};

let state = reactive({
  componentList: [], // 组件库列表
  templateList: [], // 模板库列表
  currentActionId: "",
});
const onGetComponentList = async () => {
  let res = await onGetAllListXhr();
  state.componentList = res.data?.list;
};
onGetComponentList();

const emit = defineEmits(["onAction"]);
const onAction = (params: any) => {
  const { type, item } = params;
  state.currentActionId = `${type}_${item.id}`;
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
      position: absolute;
      left: @build-sidebar-width;
      top: @build-sidebar-width - 1;
      bottom: 0;
      width: 0;
      opacity: 0;
      background: @base-color;
      overflow-y: scroll;
      border-right: 1px solid @light-color;
    }
    .title {
      padding: 0 @padding;
      background: @base-color;
      border-bottom: 1px solid @light-color;
      font-weight: bold;
      line-height: 42px;
      text-align: left;
      &-1 {
        position: sticky;
        left: 0;
        top: 0;
      }
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
      &-1 {
        width: 100%;
      }
      &:nth-child(3n) {
        border-right: none;
      }
      &-curr,
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
