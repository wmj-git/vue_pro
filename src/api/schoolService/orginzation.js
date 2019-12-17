import request from '@/utils/request'
// 获取当前组织
export function currentUser(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}
