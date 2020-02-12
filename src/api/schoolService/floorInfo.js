import request from '@/utils/request'
export function fetchList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    params: obj.params
  })
}
export function editList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 添加
export function addList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 获取建筑信息
export function buildList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}// 获取楼层信息
export function floorList(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

// 删除
export function delList(obj) {
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}

// csv文件导入
export function uploadFile(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 获取当前组织
export function currentUser(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}
// 为指定设备分配建筑
export function associateBuild(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 为指定设备分配楼层
export function associateFloor(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}
// 查询设备
export function deviceInfo(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

