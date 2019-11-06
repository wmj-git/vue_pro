import Layout from '@/layout'

const schoolService = {
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
      path: 'schoolInfo',
      component: () => import('@/views/em/school-service/schoolInfo'),
      name: 'schoolInfo',
      meta: {
        title: '学校管理',
        icon: 'chart'
      }
    },
    {
      path: 'schoolDept',
      component: () => import('@/views/em/school-service/schoolDept'),
      name: 'SchoolDept',
      meta: {
        title: '学校部门管理',
        icon: 'chart'
      }
    },
    {
      path: 'classInfo',
      component: () => import('@/views/em/school-service/classInfo'),
      name: 'ClassInfo',
      meta: {
        title: '班级管理',
        icon: 'chart'
      }
    },
    {
      path: 'studentInfo',
      component: () => import('@/views/em/school-service/studentInfo'),
      name: 'StudentInfo',
      meta: {
        title: '学生管理',
        icon: 'chart'
      }
    }
  ]
}
export default schoolService
