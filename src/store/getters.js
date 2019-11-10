const getters = {
  random: state => state.publicKey.random,
  publicKey: state => state.publicKey.publicKey, // 登录秘钥
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  RSAPublicKey: state => state.user.RSAPublicKey, // 接口秘钥
  expires: state => state.user.expires, // token存在时间
  refreshToken: state => state.user.refreshToken, // 刷新Token
  avatar: state => state.user.avatar, // 头像
  name: state => state.user.name, // 用户名
  introduction: state => state.user.introduction, // 说明
  roles: state => state.user.roles, // 用户角色
  currentRole: state => state.user.currentRole, // 当前角色
  permission_routes: state => state.permission.routes, // 用户的权限
  errorLogs: state => state.errorLog.logs
}
export default getters
