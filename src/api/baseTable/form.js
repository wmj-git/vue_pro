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

export function optionParams(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params ? obj.params : {}
  })
}

export function optionData(obj) {
  return request({
    url: obj.url,
    method: 'get',
    params: obj.params ? obj.params : {}
  })
}

export function paramsGetApi(obj) {
  return request({
    url: obj.url + '/' + obj.params,
    method: 'get'
  })
}
