import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/education/queryAllByPage',
    method: 'get',
    params: obj
  })
}
export function editList(obj) {
  return request({
    url: '/school/education/update',
    method: 'post',
    data: obj
  })
}
// 建筑管理添加
export function addList(obj) {
  return request({
    url: '/school/education/add',
    method: 'post',
    data: obj
  })
}
// 建筑管理删除
export function delList(obj) {
  return request({
    url: '/school/education/deletes',
    method: 'delete',
    data: obj.params
  })
}

// 查询区域
export function cnRegion(obj) {
  return request({
    url: '/school/cnRegion/queryAllByPage',
    method: 'get',
    params: obj
  })
}
