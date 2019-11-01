import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/school/student/downModel', // 假地址 自行替换
    method: 'get'
  })
}
