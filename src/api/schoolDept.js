import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/schoolDept/queryAllByPage',
    method: 'get',
    params: obj
  })
}
export function filterList(obj) {
  return request({
    url: '/school/school/getListByIds',
    method: 'post',
    data: obj
  })
}
export function editList(obj) {
  return request({
    url: '/school/schoolDept/update',
    method: 'post',
    data: obj
  })
}
// 部门管理添加
export function addList(obj) {
  return request({
    url: '/school/schoolDept/add',
    method: 'post',
    data: obj
  })
}
// 部门管理删除
export function delList(obj) {
  return request({
    url: '/school/schoolDept/deletes',
    method: 'delete',
    data: obj.params
  })
}
// 获取学校组织编码
export function schoolInfo() {
  return request({
    url: '/school/school/queryAllByPage',
    method: 'get'
  })
}

