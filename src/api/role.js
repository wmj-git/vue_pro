import request from '@/utils/request'

export function fetchList(obj) {
  return request({
    url: '/user/role/selectRole',
    method: 'get',
    params: obj
  })
}

export function asyncRoutesList() { // 获取动态路由数据
  return request({
    url: '/user/resources/selectResources',
    method: 'get'
  })
}

