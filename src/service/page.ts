import { request } from "~/static/utils";
import { Model } from '../../types/service'

// 列表
const onGetListXhr = (data: Model) => request.get('/page/list', data)

// 删除
const onDeleteXhr = (data: Model) => request.del('/page', data)

// 详情
const onGetDetailXhr = (data: Model) => request.get('/page', data)

// 新增
const onPostXhr = (data: Model) => request.post('/page', data)

// 修改
const onPutXhr = (data: Model) => request.put('/page', data)

// 修改状态
const onPutStatusXhr = (data: Model) => request.put('/page/status', data)

export {
    onGetListXhr,
    onDeleteXhr,
    onGetDetailXhr,
    onPostXhr,
    onPutXhr,
    onPutStatusXhr,
}
