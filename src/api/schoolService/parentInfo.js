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
// 家长管理添加
export function addList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
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
    method: 'post',
    params: obj
  })
}
// 获取班级id
export function ClassId(obj) {
  return request({
    url: obj.url,
    method: 'post',
    params: obj.params
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
// 获取年级编码
export function gradeCode(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}
