import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/school/queryAllByPage',
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
// 学校管理添加
export function addList(obj) {
  return request({
    url: '/school/school/add',
    method: 'post',
    data: obj
  })
}
// 学校管理删除
export function delList(obj) {
  return request({
    url: '/school/school/deletes',
    method: 'delete',
    data: obj.params
  })
}
// 获取所属教委id
export function educationCommission() {
  return request({
    url: '/school/education/queryAllByPage',
    method: 'get'
  })
}

