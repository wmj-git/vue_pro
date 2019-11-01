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
      path: 'split-pane',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SplitpaneDemo1',
      meta: { title: 'SplitPane' }
    },
    {
      path: 'account-manage',
      component: () => import('@/views/em/account-manager'),
      name: 'AccountManager',
      meta:
        {
          title: '账户管理',
          icon: 'chart'
        }
    },
    {
      path: 'role-manage',
      component: () => import('@/views/em/role-manager'),
      name: 'RoleManager',
      meta:
        {
          title: '角色管理',
          icon: 'chart'
        }
    }
  ]
}

export default systemManagement
