import request from '@/utils/request'
import store from '@/store'
import { encrypt, Encrypt } from '@/utils/RSAUtil'

export function queryCheckedKeys(obj) { // 获取多选框数据
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}

export function updateCheckedKeys(obj) { // 树结构数据修改
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

export function query(obj) { // 获取数据
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}

export function add(obj) { // 添加数据
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

export function del(obj) { // 树结构数据删
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}

export function update(obj) { // 树结构数据修改
  return request({
    url: obj.url,
    method: 'put',
    data: obj.params
  })
}
