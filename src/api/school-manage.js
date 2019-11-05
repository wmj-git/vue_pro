import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: '/school/school/queryAllByPage',
    method: 'get',
    data: obj
  })
}
export function filterList(ids) {
  return request({
    url: '/school/school/getListByIds',
    method: 'post',
    params: {
      ids: ids
    }
  })
}
export function editList() {
  return request({
    url: '/school/school/update',
    method: 'post'
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
// 获取所属教委id
export function JiaoweiList(obj) {
  return request({
    url: '/school/education/queryAllByPage',
    method: 'get',
    data: obj
  })
}

