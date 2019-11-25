import request from '@/utils/request'
export function add(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

export function del(obj) { // 表格数据删
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}

export function query(obj) { // 表格数据查
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}

export function update(obj) { // 表格数据修改
  let _method = 'post'

  if ('method' in obj) {
    _method = obj.method
  }

  return request({
    url: obj.url,
    method: _method,
    data: obj.params
  })
}

export function selectUrl(obj) { // 增加和修改的弹出来select获取数据
  return request({
    url: obj.url,
    method: 'get'
  })
}

export function downCsvmodel(obj) { // 下载上传表格的模板
  return request({
    url: obj.url,
    method: 'get'
  })
}
export function upLoad(obj) { // 上传表格
  return request({
    url: obj.url,
    method: 'post'
  })
}
export function resetPassword(id) { // 账户密码重置
  return request({
    url: '/user/userext/resetPwd/' + id,
    method: 'get'
  })
}
export function roleList() { // 账户管理下拉选择角色时调此方法
  return request({
    url: '/user/role/queryPage',
    method: 'get'
  })
}
export function setRoles(obj) { // 为用户设置角色的方法
  return request({
    url: '/user/userext/addUserRole',
    method: 'post',
    data: obj
  })
}

