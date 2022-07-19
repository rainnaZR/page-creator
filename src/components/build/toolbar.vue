<template>
  <div class="m-build-toolbar">
    <!-- 属性配置 -->
    <div class="box" :class="{ 'box-spread': state.spreadType == 'property' }">
      <div class="title f-curp f-fw1" @click="onTitleClick('property')">
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
import { reactive, watch } from "vue";

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
    hideFormAction: true,
  },
});

const onTitleClick = (type: string) => {
  state.spreadType = state.spreadType == type ? "" : type;
};

const onLoad = (params: any) => {
  const { propertyConfig } = params.config || {};
  const data = params.data || {};
  // 属性配置
  onLoadProperty({
    config: propertyConfig,
    data,
  });
};
const onLoadProperty = (params: any) => {
  state.propertyFormData.fields = JSON.parse(params.config || "[]");
  Object.assign(state.propertyFormData.model, params.data);
};

const emit = defineEmits(["update:propertyFormModel"]);
watch(
  state.propertyFormData.model,
  (value) => {
    emit("update:propertyFormModel", value);
  },
  {
    immediate: true,
  }
);

defineExpose({
  onLoad,
});
</script>

<style lang="less" scoped>
@import "../../static/css/variables.less";
.m-build-toolbar {
  width: @sidebar-width;
  height: 100%;
  background: @base-color;
  border-left: 1px solid @light-color;
  .box {
    .title {
      display: flex;
      align-items: center;
      padding: @padding*0.8 @padding;
      border-bottom: 1px solid @light-color;
    }
    .content {
      height: 0;
      overflow: hidden;
    }
    &-spread {
      .ht-icon {
        transform: rotate(90deg);
      }
      .content {
        height: auto;
        padding: @padding;
      }
    }
  }
}
</style>
