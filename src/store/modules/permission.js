import { getResources } from '@/utils/auth'
import { asyncRoutes, constantRoutes } from '@/router'
import { asyncRoutesList } from '@/api/role'
import { toTree } from '@/utils/tool'
import componentMap from '@/utils/componentMap'

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
        if ('meta' in _node) {
          _node.api_data = { ..._item }

          _node.id = _item.id
          _node.pid = _item.pid
          _node.weight = _item.weight
          const _str = _item.component
          if (_str && _str !== '') {
            _node.component = componentMap[_str]
          } else {
            _node.component = componentMap['Demo']
          }
          _AsyncRoutes.push(_node)
        }
      }
    }
  })
  _AsyncRoutes = toTree(_AsyncRoutes)
  return _AsyncRoutes
}
/* async function ff() {
  let _asyncRoutes = []
  await asyncRoutesList().then((response) => {
    if (response.statusCode === 200) {
      _asyncRoutes = _asyncRoutes.concat(response.data)
    }
  })
  _asyncRoutes = getAsyncRoutes(_asyncRoutes)
  _asyncRoutes.push({ path: '*', redirect: '/404', hidden: true })
  return _asyncRoutes
}*/

/* async function ff() {
  const _Resources = getResources()
  let _asyncRoutes = []
  _asyncRoutes = _asyncRoutes.concat(_Resources)
  _asyncRoutes = getAsyncRoutes(_asyncRoutes)

  _asyncRoutes.push({ path: '*', redirect: '/404', hidden: true })
  return _asyncRoutes
}*/

 async function ff() {
  const _Resources = getResources()
  // console.log('_Resources', _Resources)
  let _asyncRoutes = []
  await asyncRoutesList().then((response) => {
    if (response.statusCode === 200) {
      response.data.forEach((_item) => {
        _Resources.filter((_obj) => {
          if (_item.id === _obj.id) {
            _asyncRoutes.push(_item)
          }
          return false
        })
      })
    }
  })
  _asyncRoutes = getAsyncRoutes(_asyncRoutes)

  _asyncRoutes.push({ path: '*', redirect: '/404', hidden: true })
  return _asyncRoutes
}

const actions = {
  async generateRoutes({ commit }, roles) {
    const _asyncRoutes = await ff()
    const AsyncRoutes = _asyncRoutes.length > 1 ? _asyncRoutes : asyncRoutes
    // const AsyncRoutes = asyncRoutes
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
