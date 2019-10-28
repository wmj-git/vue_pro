/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const emPermission = {
  path: '/emPermission',
  component: Layout,
  redirect: 'noRedirect',
  name: 'emPermission',
  alwaysShow: true,
  meta: {
    title: '权限设置',
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

export default emPermission
