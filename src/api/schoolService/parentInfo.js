import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj
  })
}
export function editList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj
  })
}
// 家长管理添加
export function addList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj
  })
}
// 家长管理删除
export function delList(obj) {
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}
// 获取学生id
export function studentInfo(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj
  })
}

