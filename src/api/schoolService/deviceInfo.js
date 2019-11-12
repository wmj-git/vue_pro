import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/device/queryAllByPage',
    method: 'get',
    params: obj
  })
}
export function editList(obj) {
  return request({
    url: '/school/device/update',
    method: 'post',
    data: obj
  })
}
// 设备管理添加
export function addList(obj) {
  return request({
    url: '/school/device/add',
    method: 'post',
    data: obj
  })
}
// 设备管理删除
export function delList(obj) {
  return request({
    url: '/school/device/deletes',
    method: 'delete',
    data: obj.params
  })
}
