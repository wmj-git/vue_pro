
import Layout from '@/layout'

const componentMap = {
  // 一级菜单
  'Layout': Layout,
  // 子组件
  'Demo': () => import('@/views/demo/index'),
  // 角色和权限模板(树状结构)
  'RoleManage': () => import('@/views/em/system-management/role-manage/role-manage.vue'),
  'ParentInfo': () => import('@/views/em/school-service/parentInfo/parentInfo'),
  'TeacherInfo': () => import('@/views/em/school-service/teacherInfo/teacherInfo'),
  'DeviceManage': () => import('@/views/em/school-service/deviceManage/deviceManage'),
  'BaseTable': () => import('@/views/em/baseTable/baseTable')
}

export default componentMap
