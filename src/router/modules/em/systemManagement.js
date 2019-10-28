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
    }
  ]
}

export default systemManagement
