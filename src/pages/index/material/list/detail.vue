<template>
  <ht-form-page class="f-mt20 f-ml30" :data="data" />
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onGetDetailXhr, onPostXhr, onPutXhr } from "~/service/material";
import { UPLOAD_ACTION, UPLOAD_IMG_DOMAIN } from "~/static/constants/base";

const $route = useRoute();
const $router = useRouter();
const showType = computed(() => $route.query?.type || "");
const id = computed(() => $route.query?.id || "");
const data = reactive({
  showType: showType.value,
  formStyle: {
    width: "600px",
  },
  labelWidth: "150px",
  model: {
    title: "",
    description: "",
    categoryId: "",
    thumbImg: "",
    componentName: "",
    maintainUser: "",
    version: "",
  },
  fields: [
    {
      type: "input",
      prop: "title",
      label: "物料标题",
      required: true,
      itemProps: {
        clearable: true,
        maxLength: 200,
      },
    },
    {
      type: "input",
      prop: "description",
      label: "物料描述",
      itemProps: {
        type: "textarea",
        maxLength: 1000,
      },
    },
    {
      type: "upload",
      prop: "thumbImg",
      label: "物料缩略图",
      itemProps: {
        width: 200,
        height: 200,
        hideFileName: true,
        limit: 1,
        accept: "images/*",
        action: UPLOAD_ACTION,
        imgDomain: UPLOAD_IMG_DOMAIN,
      },
    },
    {
      type: "select",
      prop: "categoryId",
      label: "物料分类",
      required: true,
    },
    {
      type: "input",
      prop: "componentName",
      label: "组件名",
      required: true,
      itemProps: {
        clearable: true,
      },
    },
    {
      type: "input",
      prop: "maintainUser",
      label: "维护人",
      itemProps: {
        clearable: true,
      },
    },
    {
      type: "input",
      prop: "version",
      label: "版本号",
      itemProps: {
        clearable: true,
      },
    },
  ],
  actions: [
    "submit",
    "reset",
    {
      type: "cancel",
      content: "取消",
      onClick: () => $router.go(-1),
    },
  ],
  request: {
    formInitial: id.value && {
      xhr: onGetDetailXhr,
      getParams: () => ({
        id: id.value,
      }),
    },
    formSubmit: {
      xhr: id.value ? onPutXhr : onPostXhr,
      callback: ({ response = {} }: any) => {
        if (response.code === 200) {
          $router.go(-1);
        }
      },
    },
  },
});
</script>
