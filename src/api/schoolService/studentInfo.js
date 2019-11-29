import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}

export function editList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj
  })
}
// 学生管理添加
export function addList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj
  })
}
// 学生管理删除
export function delList(obj) {
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}
// 获取班级id
export function ClassId(obj) {
  return request({
    url: obj.url,
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

