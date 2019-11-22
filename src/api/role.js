import request from '@/utils/request'

export function fetchList(obj) {
  return request({
    url: '/user/role/selectRole',
    method: 'get',
    params: obj
  })
}

export function asyncRoutesList(obj) { // 获取动态路由数据(后台权限数据)
  return request({
    url: obj.url + '/' + obj.params,
    method: 'get'
  })
}

