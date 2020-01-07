
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

  // 教师管理、banner管理
  'TableInfo': () => import('@/views/em/school-service/tableInfo/tableInfo'),
  // 学生管理
  'ParentInfo': () => import('@/views/em/school-service/parentInfo/parentInfo'),
  // 设备管理
  'DeviceManage': () => import('@/views/em/school-service/deviceManage/deviceManage'),
  // 消息接收
  'MessageInfo': () => import('@/views/em/school-service/messageInfo/messageInfo')
}

export default componentMap
