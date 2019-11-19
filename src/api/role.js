import request from '@/utils/request'

export function fetchList(obj) {
  return request({
    url: '/user/role/selectRole',
    method: 'get',
    params: obj
  })
}

export function asyncRoutesList() { // 获取数据
  return request({
    url: '/user/resources/selectResources',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

