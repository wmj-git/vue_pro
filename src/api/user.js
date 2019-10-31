import request from '@/utils/request'
import store from '@/store'
import { encrypt, Encrypt } from '@/utils/RSAUtil'

// 获取后端加密字符串
export function getPbk() {
  return request({
    url: '/jwt/auth/getpbk',
    method: 'get'
  })
}

// 账户登录
export function Login(_data) {
  const obj = JSON.stringify({
    phone: _data.username,
    password: _data.password
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

// 多角色账户登录
export function GenerateAuth(_data) {
  const obj = JSON.stringify({
    phone: _data.username,
    uuid: _data.uuid,
    roleId: _data.roleId
  })
  return new Promise(function(resolve, reject) {
    encrypt(obj).then(text => {
      request({
        url: '/jwt/auth/generateAuthRsa',
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

// 获取验证码
export function GetCode(_data) {
  const obj = JSON.stringify({
    phone: _data.phone
  })
  return new Promise(function(resolve, reject) {
    Encrypt(obj).then(text => {
      request({
        url: '/jwt/register/getCodeRsa',
        method: 'get',
        params: {
          random: store.getters.random,
          text
        }
      }).then((res) => resolve(res))
    })
  })
}

// 账户注册
export function Register(_data) {
  const obj = JSON.stringify({
    phone: _data.phone,
    password: _data.password,
    code: _data.code
  })
  return new Promise(function(resolve, reject) {
    Encrypt(obj).then(text => {
      request({
        url: '/jwt/register/registryUserRsA',
        method: 'get',
        params: {
          random: store.getters.random,
          text
        }
      }).then((res) => resolve(res))
    })
  })
}
