import { request } from "~/static/utils";
import { Model } from '../../types/service'

// 页面列表
const onGetListXhr = (data: Model) => request.get('/material/list', data)

// 删除页面
const onDeleteXhr = (data: Model) => request.del('/material', data)

// 页面详情
const onGetDetailXhr = (data: Model) => request.get('/material', data)

// 新增页面
const onPostXhr = (data: Model) => request.post('/material', data)

// 修改页面
const onPutXhr = (data: Model) => request.put('/material', data)

// 修改页面状态
const onPutStatusXhr = (data: Model) => request.put('/material/status', data)

export {
    onGetListXhr,
    onDeleteXhr,
    onGetDetailXhr,
    onPostXhr,
    onPutXhr,
    onPutStatusXhr,
}
