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

export {
    onGetListXhr,
    onDeleteXhr,
    onGetDetailXhr,
    onPostXhr,
    onPutXhr,
}
