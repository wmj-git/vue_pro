import Layout from '@/layout'

const schoolService = {
  path: '/school',
  component: Layout,
  redirect: 'noRedirect',
  name: 'schoolService',
  alwaysShow: true,
  meta: {
    title: '学校管理',
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
    },
    {
      path: 'parentInfo',
      component: () => import('@/views/em/school-service/parentInfo'),
      name: 'ParentInfo',
      meta: {
        title: '家长管理',
        icon: 'chart'
      }
    },
    {
      path: 'schoolBanner',
      component: () => import('@/views/em/school-service/schoolBanner'),
      name: 'SchoolBanner',
      meta: {
        title: '学校banner图管理',
        icon: 'chart'
      }
    },
    {
      path: 'schoolBuilding',
      component: () => import('@/views/em/school-service/schoolBuilding'),
      name: 'SchoolBuilding',
      meta: {
        title: '建筑管理',
        icon: 'chart'
      }
    },
    {
      path: 'buildingFloors',
      component: () => import('@/views/em/school-service/buildingFloors'),
      name: 'BuildingFloors',
      meta: {
        title: '建筑楼层管理',
        icon: 'chart'
      }
    },
    {
      path: 'educationCommission',
      component: () => import('@/views/em/school-service/educationCommission'),
      name: 'EducationCommission',
      meta: {
        title: '教委管理',
        icon: 'chart'
      }
    },
    {
      path: 'teacherInfo',
      component: () => import('@/views/em/school-service/teacherInfo'),
      name: 'TeacherInfo',
      meta: {
        title: '教师管理',
        icon: 'chart'
      }
    },
    {
      path: 'visitorRecord',
      component: () => import('@/views/em/school-service/visitorRecord'),
      name: 'VisitorRecord',
      meta: {
        title: '访客管理',
        icon: 'chart'
      }
    },
    {
      path: 'deviceInfo',
      component: () => import('@/views/em/school-service/deviceInfo'),
      name: 'DeviceInfo',
      meta: {
        title: '设备管理',
        icon: 'chart'
      }
    },
    {
      path: 'tabsTable',
      component: () => import('@/components/tabsTable/tabsTable'),
      name: 'TabsTable',
      meta: {
        title: 'TabsTable',
        icon: 'chart'
      }
    }
  ]
}
export default schoolService
