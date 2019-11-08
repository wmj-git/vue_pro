import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/student/queryAllByPage',
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
export function ClassId(obj) {
  return request({
    url: '/school/class/queryAllByPage',
    method: 'get',
    params: obj
  })
}

// 下载导入模板
export function downModel(obj) {
  return request({
    url: '/school/student/downModel',
    method: 'get',
    params: obj
  })
}

