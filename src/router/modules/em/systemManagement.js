/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemManagement = {
  path: '/systemManagement',
  component: Layout,
  redirect: '/systemManagement/role-manage',
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
      hidden: false,
      alwaysShow: false,
      meta:
        {
          title: '角色管理',
          icon: 'chart',
          roles: ['developer', 'admin', 'editor'],
          noCache: false,
          affix: false,
          breadcrumb: true,
          system_id: 'role_manage'
        },
      children: [
        {
          path: 'menu1-2-1',
          component: () => import('@/views/demo/index.vue'),
          name: 'Menu1-2-1',
          hidden: true,
          meta: { title: 'Menu 1-2-2' }
        },
        {
          path: 'menu1-2-2',
          component: () => import('@/views/demo/index.vue'),
          name: 'Menu1-2-2',
          hidden: true,
          meta: { title: 'Menu 1-2-2' }
        }
      ]
    },
    {
      path: 'permissions-manage',
      component: () => import('@/views/em/system-management/permissions-manage/permissions-manage'),
      name: 'PermissionsManager',
      meta:
        {
          title: '权限管理',
          icon: 'chart',
          roles: ['developer']
        }
    }
  ]
}

export default systemManagement
