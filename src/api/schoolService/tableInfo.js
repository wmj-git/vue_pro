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
// 获取当前组织
export function currentUser(obj) {
  return request({
    url: obj.url,
    method: 'get',
    data: obj.params
  })
}
// 获取当前组织的banner
export function currentBanner(obj) {
  return request({
    url: obj.url,
    method: 'get',
    data: obj.params
  })
}
// 上传banner
export function client(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

// 获取已分配-未分配班级
export function classList(obj) {
  return request({
    url: obj.url,
    method: 'get',
    data: obj.params
  })
}
// 通过电话查询家长
export function parentList(obj) {
  return request({
    url: obj.url,
    method: 'get',
    data: obj.params
  })
}
