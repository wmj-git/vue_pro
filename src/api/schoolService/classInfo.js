import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/class/queryAllByPage',
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
    url: '/school/school/update',
    method: 'post',
    data: obj
  })
}
// 班级添加
export function addList(obj) {
  return request({
    url: '/school/class/add',
    method: 'post',
    data: obj
  })
}
// 班级删除
export function delList(obj) {
  return request({
    url: '/school/class/deletes',
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

