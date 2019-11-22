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
  const _data = sessionStorage.getItem(userKey)
  return JSON.parse(_data)
}

export function setUser(_data) {
  return sessionStorage.setItem(userKey, JSON.stringify(_data))
}

export function removeUser() {
  return sessionStorage.removeItem(userKey)
}

export function getResources() {
  const _data = sessionStorage.getItem('resourcesKey')
  return JSON.parse(_data)
}

export function setResources(_data) {
  return sessionStorage.setItem('resourcesKey', JSON.stringify(_data))
}

export function removeResources() {
  return sessionStorage.removeItem('resourcesKey')
}

export function getCurrentRole() {
  const _data = sessionStorage.getItem(_CurrentRole)
  return JSON.parse(_data)
}

export function setCurrentRole(_data) {
  return sessionStorage.setItem(_CurrentRole, JSON.stringify(_data))
}

export function removeCurrentRole() {
  return sessionStorage.removeItem(_CurrentRole)
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
