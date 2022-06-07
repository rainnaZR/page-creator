<template>
  <ht-table-page :data="data" @on-action="onAction" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { onGetPageListXhr, onDeletePageXhr } from "~/service/page";

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
  toolbar: ["add"],
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
        sortable: true,
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
      // {
      //   title: "操作",
      //   width: 180,
      //   fixed: "right",
      //   actions: ["detail", "edit", "delete"],
      // },
    ],
  },
});

const onAction = (value) => alert(`'${value.action.type}'类型按钮点击`);
</script>
