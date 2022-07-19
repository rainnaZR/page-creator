<template>
  <div class="m-build-toolbar">
    <!-- 属性配置 -->
    <div class="box">
      <div
        class="title f-curp f-fw1"
        :class="{ 'title-curr': state.spreadType == 'property' }"
        @click="onTitleClick('property')"
      >
        <div class="f-f1">属性配置</div>
        <ht-icon class="f-trans" :data="{ name: 'u-icon-arrowRight' }" />
      </div>
      <div class="content">
        <ht-form-page :data="state.propertyFormData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { tools } from "~/static/utils";

const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
  data: {
    type: Object,
    default: () => {},
  },
});
const state = reactive({
  spreadType: "property",
  propertyFormData: {
    size: "small",
    model: {},
    fields: [],
  },
});

const onTitleClick = (type: string) => {
  state.spreadType = state.spreadType == type ? "" : type;
};
const onLoad = (options: Object) => {};
</script>

<style lang="less" scoped>
@import "../../static/css/variables.less";
.m-build-toolbar {
  width: @sidebar-width;
  height: 100%;
  background: @base-color;
  border-left: 1px solid @light-color;
  .title {
    display: flex;
    align-items: center;
    padding: @padding*0.8 @padding;
    border-bottom: 1px solid @light-color;
    &-curr {
      .ht-icon {
        transform: rotate(90deg);
      }
    }
  }
  .content {
    padding: @padding;
  }
}
</style>
