<template>
  <ht-form-page class="f-mt20 f-ml30" :data="data" />
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  onGetPageDetailXhr,
  onPostPageXhr,
  onPutPageXhr,
} from "~/service/page";

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
    expireTime: "",
  },
  fields: [
    {
      type: "input",
      prop: "title",
      label: "页面标题",
      required: true,
      itemProps: {
        clearable: true,
        maxLength: 200,
      },
    },
    {
      type: "input",
      prop: "description",
      label: "页面描述",
      itemProps: {
        type: "textarea",
        maxLength: 1000,
      },
    },
    {
      type: "datePicker",
      prop: "expireTime",
      label: "过期时间",
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
      xhr: onGetPageDetailXhr,
      getParams: () => ({
        id: id.value,
      }),
    },
    formSubmit: {
      xhr: id.value ? onPutPageXhr : onPostPageXhr,
      callback: ({ response = {} }: any) => {
        if (response.code === 200) {
          $router.go(-1);
        }
      },
    },
  },
});
</script>
