import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    params: obj.params
  })
}
export function editList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 设备管理添加
export function addList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 设备管理删除
export function delList(obj) {
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}
// 获取学校组织编码
export function schoolInfo(obj) {
  return request({
    url: obj.url,
    method: 'post'
  })
}
// 获取设备类型
export function deviceType(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}
