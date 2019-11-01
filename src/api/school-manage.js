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
