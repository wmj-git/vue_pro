const getters = {
  random: state => state.publicKey.random,
  publicKey: state => state.publicKey.publicKey,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  RSAPublicKey: state => state.user.RSAPublicKey,
  expires: state => state.user.expires,
  refreshToken: state => state.user.refreshToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
