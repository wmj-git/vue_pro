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
// 添加
export function addList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 获取建筑信息
export function buildList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 删除
export function delList(obj) {
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}

// csv文件导入
export function uploadFile(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 获取当前组织
export function currentUser(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}
