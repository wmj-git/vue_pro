
import Layout from '@/layout'

const componentMap = {
  'Layout': Layout, // 一级菜单
  'Demo': () => import('@/views/demo/index'), // 子组件
  'RoleManage': () => import('@/views/em/system-management/role-manage/role-manage.vue'),
  'AccountManage': () => import('@/views/em/system-management/account-manage')
}

export default componentMap
