<template>
  <ht-table-page :data="data" @on-action="onAction" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onGetPageListXhr, onDeletePageXhr } from "~/service/page";

const $router = useRouter();
const $route = useRoute();
const data = reactive({
  request: {
    onGetListXhr: {
      xhr: onGetPageListXhr,
    },
    onDeleteXhr: {
      xhr: onDeletePageXhr,
    },
  },
  filterForm: {
    hideLoading: true,
    inline: true,
    model: {
      title: "",
    },
    fields: [
      {
        type: "input",
        label: "页面名称",
        prop: "title",
        itemProps: {
          clearable: true,
        },
      },
    ],
    actions: [
      {
        type: "submit",
        content: "搜索",
      },
      "reset",
    ],
  },
  toolbar: [
    {
      type: "add",
      content: "新增页面",
      onClick: () => {
        $router.push(`${$route.path}/detail`);
      },
    },
  ],
  table: {
    id: "PageListTable",
    height: "auto",
    size: "small",
    autoResize: true,
    border: false,
    stripe: true,
    align: "left",
    custom: true,
    customConfig: { storage: true },
    columnConfig: { resizable: true },
    rowConfig: { isHover: true },
    columns: [
      { type: "seq", title: "序号", fixed: "left", width: 50 },
      {
        title: "标题",
        field: "title",
        showOverflow: true,
      },
      {
        title: "描述",
        field: "description",
        showOverflow: true,
      },
      {
        title: "有效期",
        field: "expireTime",
      },
      {
        title: "操作用户",
        field: "updateUser",
      },
      {
        title: "更新时间",
        field: "updateTime",
        sortable: true,
      },
      {
        title: "创建时间",
        field: "createTime",
        sortable: true,
      },
      {
        title: "操作",
        width: 180,
        fixed: "right",
        actions: [
          {
            type: "build",
            content: "搭建",
            onClick: ({ row = {} }: any) => {
              const route = $router.resolve(`/build?id=${row.id}`);
              window.open(route.href, "_blank");
            },
          },
          {
            type: "detail",
            content: "预览",
            onClick: ({ row = {} }: any) => {
              const route = $router.resolve(`/preview?id=${row.id}`);
              window.open(route.href, "_blank");
            },
          },
          {
            type: "edit",
            content: "编辑",
            onClick: ({ row = {}, action = {} }: any) => {
              $router.push(
                `${$route.path}/detail?type=${action.type}&id=${row.id}`
              );
            },
          },
          "delete",
        ],
      },
    ],
  },
});
</script>
