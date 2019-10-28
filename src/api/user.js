import request from '@/utils/request'
import store from '@/store'
import { encrypt } from '@/utils/RSAUtil'

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 账户登录
export function Login(username, password) {
  const obj = JSON.stringify({
    username,
    password
  })
  return new Promise(function(resolve, reject) {
    encrypt(obj).then(text => {
      request({
        url: '/jwt/auth/authRsa',
        method: 'get',
        params: {
          random: store.getters.random,
          text
        }
      }).then((res) => resolve(res))
    })
  })
}

// 账户登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取后端加密字符串
export function getPbk() {
  return request({
    url: '/jwt/auth/getpbk',
    method: 'get'
  })
}
