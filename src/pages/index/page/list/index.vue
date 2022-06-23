<template>
  <ht-table-page ref="tableRef" :data="data" />
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  PAGE_STATUS,
  PAGE_STATUS_MAP,
  PAGE_STATUS_OPTIONS,
} from "~/static/constants/page";
import { onPutStatusXhr, onGetListXhr, onDeleteXhr } from "~/service/page";

const $router = useRouter();
const $route = useRoute();
const { $dialog, $loading, $toast } = getCurrentInstance()?.proxy;
const tableRef = ref(null);

const onSetStatus = ({ row }: any) => {
  let status =
    row.status == PAGE_STATUS.NORMAL ? PAGE_STATUS.INVALID : PAGE_STATUS.NORMAL;
  $dialog.show({
    content: `确认${PAGE_STATUS_MAP[status]}当前页面吗？`,
    onConfirm: async () => {
      const loading = $loading();
      try {
        let result = await onPutStatusXhr({
          id: row.id,
          status,
        });
        loading.close();
        if (result.code == 200) {
          $toast.success("操作成功");
          $dialog.close();
          tableRef.value?.onReLoadList();
        }
      } catch (e) {
        loading.close();
        $toast.error("接口请求出错，请稍后再试！");
      }
    },
  });
};

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
        label: "页面标题",
        prop: "title",
        itemProps: {
          clearable: true,
        },
      },
      {
        type: "select",
        label: "页面状态",
        prop: "status",
        itemProps: {
          options: [
            {
              label: "全部",
              value: 0,
            },
            ...PAGE_STATUS_OPTIONS,
          ],
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
      content: "新增",
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
        sortable: true,
      },
      {
        title: "页面状态",
        field: "statusName",
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
            type: "build",
            content: "搭建",
            onClick: ({ row = {} }: any) => {
              const route = $router.resolve({
                path: "/build",
                query: {
                  id: row.id,
                  isFullScreen: 1,
                },
              });
              window.open(route.href, "_blank");
            },
          },
          {
            type: "detail",
            content: "预览",
            onClick: ({ row = {} }: any) => {
              const route = $router.resolve({
                path: "/preview",
                query: {
                  id: row.id,
                },
              });
              window.open(route.href, "_blank");
            },
          },
          {
            type: "enabled",
            content: "生效",
            show: {
              status: PAGE_STATUS.INVALID,
            },
            onClick: onSetStatus,
          },
          {
            type: "disabled",
            content: "失效",
            show: {
              status: PAGE_STATUS.NORMAL,
            },
            onClick: onSetStatus,
          },
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
