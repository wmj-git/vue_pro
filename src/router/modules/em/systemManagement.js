/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemManagement = {
  path: '/systemManagement',
  component: Layout,
  redirect: 'noRedirect',
  name: 'systemManagement',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'component'
  },
  children: [
    {
      path: 'account-manage',
      component: () => import('@/views/em/system-management/account-manage/account-manage'),
      name: 'AccountManage',
      meta:
        {
          title: '账户管理',
          icon: 'chart'
        }
    },
    {
      path: 'role-manage',
      component: () => import('@/views/em/system-management/role-manage/role-manage'),
      name: 'RoleManager',
      meta:
        {
          title: '角色管理',
          icon: 'chart'
        }
    },
    {
      path: 'permissions-manage',
      component: () => import('@/views/em/system-management/permissions-manage/permissions-manage'),
      name: 'PermissionsManager',
      meta:
        {
          title: '权限管理',
          icon: 'chart'
        }
    }
  ]
}

export default systemManagement
