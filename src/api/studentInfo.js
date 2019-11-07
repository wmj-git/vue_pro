import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/student/queryAllByPage',
    method: 'get',
    params: obj
  })
}
export function filterList(obj) {
  return request({
    url: '/school/student/getListByClassId',
    method: 'get',
    params: obj
  })
}
export function editList(obj) {
  return request({
    url: '/school/student/update',
    method: 'post',
    data: obj
  })
}
// 学生管理添加
export function addList(obj) {
  return request({
    url: '/school/student/add',
    method: 'post',
    data: obj
  })
}
// 学生管理删除
export function delList(obj) {
  return request({
    url: '/school/student/deletes',
    method: 'delete',
    data: obj.params
  })
}
// 获取班级id
export function classId(obj) {
  return request({
    url: '/school/class/queryAllByPage',
    method: 'get',
    params: obj
  })
}

