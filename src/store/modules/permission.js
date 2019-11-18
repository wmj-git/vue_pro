import { asyncRoutes, constantRoutes } from '@/router'
import { asyncRoutesList } from '@/api/role'
import { toTree } from '@/utils/tool'
/* Layout(二级菜单) */
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// 后台获取路由列表
function getAsyncRoutes(_asyncRoutes) {
  let _AsyncRoutes = []
  _asyncRoutes.forEach((_item) => {
    let _extData = null
    if ('extData' in _item && _item.extData) {
      _extData = _item.extData
      _extData = _extData.replace(/\\n/g, '')// 去掉换行
      _extData = _extData.replace(/\s*/g, '')// 去掉空格

      if (_extData.substr(0, 1) === '{' && _extData.substr(-1) === '}') {
        const _node = JSON.parse(_extData)
        _node.api_data = { ..._item }

        _node.id = _item.id
        _node.pid = _item.pid
        _node.weight = _item.weight
        const _str = _item.component
        if (_str.substr(0, 1) === '@') {
          _node.component = () => import(_str)
        } else if (_str === 'Layout') {
          _node.component = Layout
        } else {
          _node.component = () => import('@/views/demo/index.vue')
        }
        _AsyncRoutes.push(_node)
      }
    }
  })
  console.log('getAsyncRoutes---', _AsyncRoutes)
  _AsyncRoutes = toTree(_AsyncRoutes)
  return _AsyncRoutes
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, roles) {
    let _asyncRoutes = []
    await asyncRoutesList().then((response) => {
      if (response.statusCode === 200) {
        _asyncRoutes = _asyncRoutes.concat(response.data)
        console.log('getAsyncRoutes', response)
      }
    })
    _asyncRoutes = getAsyncRoutes(_asyncRoutes)
    _asyncRoutes.push({ path: '*', redirect: '/404', hidden: true })
    console.log('getAsyncRoutes---123', _asyncRoutes)
    const AsyncRoutes = _asyncRoutes.length > 1 ? _asyncRoutes : asyncRoutes
    return new Promise((resolve) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = AsyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(AsyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
