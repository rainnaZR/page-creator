import { request } from "~/static/utils";
import { Model } from '../../types/service'

// 列表
const onGetListXhr = (data: Model) => request.get('/material/list', data)

// 删除
const onDeleteXhr = (data: Model) => request.del('/material', data)

// 详情
const onGetDetailXhr = (data: Model) => request.get('/material', data)

// 新增
const onPostXhr = (data: Model) => request.post('/material', data)

// 修改
const onPutXhr = (data: Model) => request.put('/material', data)

// 所有内容
const onGetAllListXhr = (data: Model) => request.get('/material/list/all', data)

// 分类列表
const onGetCategoryListXhr = (data: Model) => request.get('/material/category/list', data)

// 分类删除
const onDeleteCategoryXhr = (data: Model) => request.del('/material/category', data)

// 分类详情
const onGetCategoryDetailXhr = (data: Model) => request.get('/material/category', data)

// 分类新增
const onPostCategoryXhr = (data: Model) => request.post('/material/category', data)

// 分类修改
const onPutCategoryXhr = (data: Model) => request.put('/material/category', data)

export {
    onGetListXhr,
    onDeleteXhr,
    onGetDetailXhr,
    onPostXhr,
    onPutXhr,
    onGetAllListXhr,
    onGetCategoryListXhr,
    onDeleteCategoryXhr,
    onGetCategoryDetailXhr,
    onPostCategoryXhr,
    onPutCategoryXhr,
}
