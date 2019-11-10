import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userKey = 'system-user'
const _CurrentRole = 'system-CurrentRole'
const _SAPublicKey = 'system-RSAPublicKey'
const _expires = 'system-expires'
const _refreshToken = 'system-refreshToken'
export const TokenName = 'Authorization'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return Cookies.get(userKey)
}

export function setUser(_data) {
  return Cookies.set(userKey, _data)
}

export function removeUser() {
  return Cookies.remove(userKey)
}

export function getCurrentRole() {
  return Cookies.get(_CurrentRole)
}

export function setCurrentRole(_data) {
  return Cookies.set(_CurrentRole, _data)
}

export function removeCurrentRole() {
  return Cookies.remove(_CurrentRole)
}

export function getRSAPublicKey() {
  return Cookies.get(_SAPublicKey)
}

export function setRSAPublicKey(_data) {
  return Cookies.set(_SAPublicKey, _data)
}

export function removeRSAPublicKey() {
  return Cookies.remove(_SAPublicKey)
}

export function getExpires() {
  return Cookies.get(_expires)
}

export function setExpires(_data) {
  return Cookies.set(_expires, _data)
}

export function removeExpires() {
  return Cookies.remove(_expires)
}

export function getRefreshToken() {
  return Cookies.get(_refreshToken)
}

export function setRefreshToken(_data) {
  return Cookies.set(_refreshToken, _data)
}

export function removeRefreshToken() {
  return Cookies.remove(_refreshToken)
}
