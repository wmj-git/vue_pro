import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/floor/queryAllByPage',
    method: 'get',
    params: obj
  })
}
export function editList(obj) {
  return request({
    url: '/school/floor/update',
    method: 'post',
    data: obj
  })
}
// 建筑管理添加
export function addList(obj) {
  return request({
    url: '/school/floor/add',
    method: 'post',
    data: obj
  })
}
// 建筑管理删除
export function delList(obj) {
  return request({
    url: '/school/floor/deletes',
    method: 'delete',
    data: obj.params
  })
}
// 获取建筑id
export function schoolBuilding(obj) {
  return request({
    url: '/school/building/queryAllByPage',
    method: 'get',
    params: obj
  })
}

