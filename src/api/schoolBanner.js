import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/banner/queryAllByPage',
    method: 'get',
    params: obj
  })
}
export function filterList(obj) {
  return request({
    url: '/school/banner/selectByOrgCode',
    method: 'get',
    params: obj
  })
}
// banner修改
export function editList(obj) {
  return request({
    url: '/school/banner/update',
    method: 'post',
    data: obj
  })
}
// 上传学校宣传文件
export function upload(obj) {
  return request({
    url: '/school/banner/addAndUpload',
    method: 'post',
    data: obj
  })
}
// banner删除
export function delList(obj) {
  return request({
    url: '/school/banner/deletes',
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

