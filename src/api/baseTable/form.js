import request from '@/utils/request'

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

export function optionData(obj) {
  if (obj.method && obj.method !== 'get') {
    return request({
      url: obj.url,
      method: obj.method,
      data: obj.params || {}
    })
  }
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params || {}
  })
}

export function paramsGetApi(obj) {
  return request({
    url: obj.url + '/' + obj.params,
    method: 'get'
  })
}

export function postApi(obj) {
  return request({
    url: obj.url,
    method: obj.method ? obj.method : 'post',
    data: obj.params
  })
}
