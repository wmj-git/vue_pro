import { Login, GenerateAuth, Logout, RefreshToken, Register, GetCode } from '@/api/user'
import { ChangeRoles } from '@/api/role'
import { getToken, setToken, removeToken, setResources, removeResources,
  setUser, getUser, removeUser,
  getCurrentRole, setCurrentRole, removeCurrentRole,
  getRSAPublicKey, setRSAPublicKey, removeRSAPublicKey,
  getExpires, setExpires, removeExpires,
  getRefreshToken, setRefreshToken, removeRefreshToken
} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  RSAPublicKey: getRSAPublicKey(),
  expires: getExpires(),
  refreshToken: getRefreshToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [], // 用户所有角色
  displayMode: ['default'], // 当前模式
  currentRole: '' // 当前角色对象
}

const mutations = {

  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_RSAPUBLICKEY: (state, RSAPublicKey) => {
    state.RSAPublicKey = RSAPublicKey
  },
  SET_EXPIRES: (state, expires) => {
    state.expires = expires
  },
  SET_REFRESHTOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = []
    state.roles = state.roles.concat(roles)
  },
  SET_DisplayMode: (state, displayMode) => {
    state.displayMode = []
    state.displayMode = state.roles.concat(displayMode)
  },
  SET_CURRENTROLE: (state, currentRole) => {
    setCurrentRole(currentRole)
    state.currentRole = currentRole
  }
}

// 登录时数据存入vuex
function setUserData(commit, data) {
  if (data.token) {
    /* commit('SET_TOKEN', data.token.Authorization)
    setToken(data.token.Authorization) */
    commit('SET_TOKEN', data.token.Authorization)
    setToken(data.token.Authorization)
    commit('SET_REFRESHTOKEN', data.token.refreshAuthorization)
    setRefreshToken(data.token.refreshAuthorization)
    commit('SET_RSAPUBLICKEY', data.token.RSAPublicKey)
    setRSAPublicKey(data.token.RSAPublicKey)
    commit('SET_EXPIRES', data.token.expires)
    setExpires(data.token.expires)
  }
  if (data.user && data.user.roleList) {
    const _roles = []
    data.user.roleList.forEach(function(_item) {
      _roles.push(_item)
    })
    commit('SET_ROLES', _roles)
    commit('SET_NAME', data.user.username)
    commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    commit('SET_INTRODUCTION', data.user.createDate)
    if ('resources' in data) {
      setResources(data.resources)
    }
    setUser(data.user)
  }
}

const actions = {
  // 获取验证码
  getCode({ commit }, userInfo) {
    const { username } = userInfo
    return new Promise((resolve, reject) => {
      GetCode({ phone: username.trim() }).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户注册
  register({ commit }, userInfo) {
    const { username, password, code } = userInfo
    return new Promise((resolve, reject) => {
      Register({ phone: username.trim(), password: password, code: code.trim() }).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      Login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        setUserData(commit, data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 多角色用户登录
  generateAuth({ commit }, userInfo) {
    const { username, uuid, roleId } = userInfo
    return new Promise((resolve, reject) => {
      GenerateAuth({ username: username.trim(), uuid: uuid, roleId: roleId }).then(response => {
        const { data } = response
        setUserData(commit, data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取本地存储的用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = getUser()

      if (!data) {
        reject('Verification failed, please Login again.')
      }
      const { roleList, username, createDate } = data

      const roles = []
      roleList.forEach(function(_item) {
        roles.push(_item)
      })

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }
      const _currentRole = getCurrentRole()
      commit('SET_ROLES', roles)
      commit('SET_CURRENTROLE', _currentRole)
      commit('SET_NAME', username)
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      commit('SET_INTRODUCTION', createDate)

      resolve()
    })
  },
  // user logout*
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      Logout(state.refreshToken).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        commit('SET_REFRESHTOKEN', '')
        removeRefreshToken()
        commit('SET_RSAPUBLICKEY', '')
        removeRSAPublicKey()
        commit('SET_EXPIRES', '')
        removeExpires()
        commit('SET_ROLES', [])
        removeUser()
        removeResources()
        removeCurrentRole()
        resetRouter()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 刷新Token
  refreshTokenFn({ commit, state }) {
    return new Promise((resolve, reject) => {
      RefreshToken(state.refreshToken).then(response => {
        const { data } = response
        console.log('refreshToken', response)

        commit('SET_TOKEN', data.Authorization)
        setToken(data.Authorization)
        commit('SET_REFRESHTOKEN', data.refreshAuthorization)
        setRefreshToken(data.refreshAuthorization)
        commit('SET_EXPIRES', data.expires)
        setExpires(data.expires)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions-manage
  changeRoles({ commit, state, dispatch }, role) {
    return new Promise(async resolve => {
      const _user = getUser()
      const _params = {
        'phone': _user.phone,
        'refreshAuthorization': state.refreshToken,
        'roleId': role
      }

      ChangeRoles(_params).then((res) => {
        console.log('ChangeRoles', res)
      })
      state.roles.forEach(function(_role) {
        if (_role.id === role) {
          commit('SET_CURRENTROLE', _role)
        }
      })

      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', state.displayMode, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
