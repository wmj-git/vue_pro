import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/visitor/queryAllByPage',
    method: 'get',
    params: obj
  })
}
export function editList(obj) {
  return request({
    url: '/school/visitor/update',
    method: 'post',
    data: obj
  })
}
// 访客管理添加
export function addList(obj) {
  return request({
    url: '/school/visitor/add',
    method: 'post',
    data: obj
  })
}
// 访客管理删除
export function delList(obj) {
  return request({
    url: '/school/visitor/deletes',
    method: 'delete',
    data: obj.params
  })
}
// 获取学校id
export function schoolInfo(obj) {
  return request({
    url: '/school/school/queryAllByPage',
    method: 'get',
    params: obj
  })
}

