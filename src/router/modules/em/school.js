import Layout from '@/layout'

const school = {
  path: '/school',
  component: Layout,
  redirect: 'noRedirect',
  name: 'schoolService',
  alwaysShow: true,
  meta: {
    title: '学校服务',
    icon: 'component'
  },
  children: [
    {
      path: 'school-manage',
      component: () => import('@/views/em/school-service/school-manage'),
      name: 'SchoolManage',
      meta: {
        title: '学校管理',
        icon: 'chart'
      }
    },
    {
      path: 'school-department',
      component: () => import('@/views/em/school-service/school-department'),
      name: 'SchoolDepartment',
      meta: {
        title: '学校部门管理',
        icon: 'chart'
      }
    }
  ]
}
export default school
