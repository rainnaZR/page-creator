<template>
  <ht-table-page :data="data" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onGetListXhr, onDeleteXhr } from "~/service/material";

const $router = useRouter();
const $route = useRoute();
const data = reactive({
  request: {
    onGetListXhr: {
      xhr: onGetListXhr,
    },
    onDeleteXhr: {
      xhr: onDeleteXhr,
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
        label: "物料标题",
        prop: "title",
        itemProps: {
          clearable: true,
        },
      },
      {
        type: "select",
        label: "物料分类",
        prop: "categoryId",
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
      content: "新增",
      onClick: () => {
        $router.push(`${$route.path}/detail`);
      },
    },
  ],
  table: {
    id: "MaterialListTable",
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
        title: "缩略图",
        field: "thumbImg",
        showConfig: {
          type: "image",
          imgWidth: 100,
          imgHeight: 100,
        },
      },
      {
        title: "分类",
        field: "categoryName",
      },
      {
        title: "维护用户",
        field: "maintainUser",
      },
      {
        title: "版本号",
        field: "version",
      },
      {
        title: "操作用户",
        field: "updateUser",
      },
      {
        title: "操作时间",
        field: "updateTime",
        minWidth: 150,
        sortable: true,
      },
      {
        title: "操作",
        width: 200,
        fixed: "right",
        actions: [
          {
            type: "edit",
            content: "编辑",
            onClick: ({ row = {}, action = {} }: any) => {
              $router.push({
                path: `${$route.path}/detail`,
                query: {
                  type: action.type,
                  id: row.id,
                },
              });
            },
          },
          "delete",
        ],
      },
    ],
  },
});
</script>
