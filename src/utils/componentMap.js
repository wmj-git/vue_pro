
import Layout from '@/layout'

const componentMap = {
  // 一级菜单
  'Layout': Layout,
  // 子组件
  'Demo': () => import('@/views/demo/index'),
  // 角色和权限模板(树状结构)
  'RoleManage': () => import('@/views/em/system-management/role-manage/role-manage.vue'),
  // 表格基本功能页面模板
  'BaseTable': () => import('@/views/em/baseTable/baseTable'),
  // 功能页面
  'EditHtml': () => import('@/views/em/editHtml/editHtml'),

  'TableInfo': () => import('@/views/em/school-service/tableInfo/tableInfo'),
  'ParentInfo': () => import('@/views/em/school-service/parentInfo/parentInfo'),
  'TeacherInfo': () => import('@/views/em/school-service/teacherInfo/teacherInfo'),
  'DeviceManage': () => import('@/views/em/school-service/deviceManage/deviceManage')
}

export default componentMap
