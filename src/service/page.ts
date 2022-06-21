import { request } from "~/static/utils";
import { Model } from '../../types/service'

// 页面列表
const onGetPageListXhr = (data: Model) => request.get('/page/list', data)

// 删除页面
const onDeletePageXhr = (data: Model) => request.del('/page', data)

// 页面详情
const onGetPageDetailXhr = (data: Model) => request.get('/page', data)

// 新增页面
const onPostPageXhr = (data: Model) => request.post('/page', data)

// 修改页面
const onPutPageXhr = (data: Model) => request.put('/page', data)


export {
    onGetPageListXhr,
    onDeletePageXhr,
    onGetPageDetailXhr,
    onPostPageXhr,
    onPutPageXhr,
}
