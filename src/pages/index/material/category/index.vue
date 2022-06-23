<template>
  <ht-table-page :data="data" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onGetCategoryListXhr, onDeleteCategoryXhr } from "~/service/material";

const $router = useRouter();
const $route = useRoute();
const data = reactive({
  request: {
    onGetListXhr: {
      xhr: onGetCategoryListXhr,
    },
    onDeleteXhr: {
      xhr: onDeleteCategoryXhr,
    },
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
    id: "MaterialCategoryListTable",
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
        title: "操作用户",
        field: "updateUser",
        minWidth: 100,
      },
      {
        title: "操作时间",
        field: "updateTime",
        minWidth: 150,
        sortable: true,
      },
      {
        title: "操作",
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
