import request from '@/utils/request'
export function add(obj) {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.params
  })
}

export function del(obj) {
  return request({
    url: obj.url,
    method: 'delete',
    data: obj.params
  })
}

export function getData(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params
  })
}

export function update(obj) {
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

