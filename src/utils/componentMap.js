
import Layout from '@/layout'

const componentMap = {
  // 一级菜单
  'Layout': Layout,
  // 子组件
  'Demo': () => import('@/views/demo/index'),
  // 角色和权限模板(树状结构)
  'RoleManage': () => import('@/views/em/system-management/role-manage/role-manage.vue'),
  // 用户模板
  'AccountManage': () => import('@/views/em/system-management/account-manage')
}

export default componentMap
