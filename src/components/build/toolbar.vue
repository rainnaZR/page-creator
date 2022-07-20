<template>
  <div class="m-build-toolbar">
    <!-- 属性配置 -->
    <div
      class="box"
      :class="{ 'box-spread': state.spreadType.includes('property') }"
    >
      <div class="title f-curp f-fw1" @click="onTitleClick('property')">
        <div class="f-f1">属性配置</div>
        <ht-icon class="f-trans" :data="{ name: 'u-icon-arrowRight' }" />
      </div>
      <div class="content">
        <ht-form-page
          ref="propertyFormPageRef"
          :data="state.propertyFormData"
        />
      </div>
    </div>

    <!-- 样式配置 -->
    <div
      class="box"
      :class="{ 'box-spread': state.spreadType.includes('style') }"
    >
      <div class="title f-curp f-fw1" @click="onTitleClick('style')">
        <div class="f-f1">样式配置</div>
        <ht-icon class="f-trans" :data="{ name: 'u-icon-arrowRight' }" />
      </div>
      <div class="content">
        <ht-form-page ref="styleFormPageRef" :data="state.styleFormData" />
      </div>
    </div>

    <!-- 事件配置 -->
    <div
      class="box"
      :class="{ 'box-spread': state.spreadType.includes('event') }"
    >
      <div class="title f-curp f-fw1" @click="onTitleClick('event')">
        <div class="f-f1">事件配置</div>
        <ht-icon class="f-trans" :data="{ name: 'u-icon-arrowRight' }" />
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";

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
const propertyFormPageRef = ref(null);
const styleFormPageRef = ref(null);
const defaultFormData = {
  labelWidth: "80px",
  labelPosition: "left",
  size: "small",
  model: {},
  fields: [],
  hideFormAction: true,
};
const state = reactive({
  spreadType: ["property", "style", "event"],
  propertyFormData: {
    ...defaultFormData,
  },
  styleFormData: {
    ...defaultFormData,
  },
});

const onTitleClick = (type: string) => {
  const index = state.spreadType.indexOf(type);
  if (index == -1) {
    state.spreadType.push(type);
  } else {
    state.spreadType.splice(index, 1);
  }
};

const onLoad = (params: any) => {
  const { propertyConfig, styleConfig } = params.config || {};
  const data = params.data || {};
  // 属性配置
  onLoadData({
    key: "propertyFormData",
    config: propertyConfig,
    data,
  });
  // 样式配置
  onLoadData({
    key: "styleFormData",
    config: styleConfig,
    data,
  });
};

const onLoadData = (params: any) => {
  const { key, config, data } = params;

  Object.assign(state[key].model, data);
  state[key].fields = JSON.parse(config || "[]");
  const formPageRef =
    key == "propertyFormData" ? propertyFormPageRef : styleFormPageRef;
  formPageRef.value?.onInitFormModel();
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
  overflow-y: auto;
  background: @base-color;
  border-left: 1px solid @light-color;
  .box {
    .title {
      display: flex;
      align-items: center;
      padding: @padding*0.8 @padding;
      border-top: 1px solid @light-color;
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
