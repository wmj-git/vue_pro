/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemManagement = {
  id: 11,
  pid: 0,
  weight: 200,
  path: '/systemManagement',
  component: Layout,
  redirect: '/systemManagement/account-manage',
  name: 'Layout',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'component',
    roles: ['developer', 'admin', 'editor'],
    noCache: false,
    affix: false,
    breadcrumb: true,
    'system_id': 'systemManagement',
    'system_type': 'Layout',
    'control_type': '',
    'control_id': '',
    'fn': '',
    'fn_type': ''
  },
  children: [
    {
      id: 111,
      pid: 11,
      weight: 200,
      path: 'account-manage',
      component: () => import('@/views/em/system-management/account-manage/account-manage'),
      redirect: '',
      name: 'AccountManage',
      hidden: false,
      alwaysShow: false,
      meta: {
        title: '账户管理',
        icon: 'chart',
        roles: ['developer', 'admin', 'editor'],
        noCache: false,
        affix: false,
        breadcrumb: true,
        'system_id': 'systemManagement_account-manage',
        'system_type': 'AccountManage',
        'control_type': '',
        'control_id': '',
        'fn': '',
        'fn_type': ''
      }
    },
    {
      id: 112,
      pid: 11,
      weight: 200,
      path: 'role-manage',
      component: () => import('@/views/em/system-management/role-manage/role-manage'),
      redirect: '',
      name: 'RoleManage',
      hidden: false,
      alwaysShow: false,
      meta: {
        title: '角色管理',
        icon: 'chart',
        roles: ['developer', 'admin', 'editor'],
        noCache: true,
        affix: false,
        breadcrumb: true,
        'system_id': 'systemManagement_role-manage',
        'system_type': 'RoleManage',
        verticalPercent: '30',
        horizontalPercent: '90',
        buttonGroup: true,
        tree: true,
        form_L: true,
        form_R: false,
        'control_type': '',
        'control_id': '',
        'fn': '',
        'fn_type': ''
      },
      children: [
        {
          id: 1121,
          pid: 112,
          weight: 200,
          path: 'EmButtonGroup',
          component: () => import('@/views/demo/index.vue'),
          redirect: '',
          name: 'EmButtonGroup',
          hidden: true,
          alwaysShow: false,
          meta: {
            title: '功能按钮组',
            icon: 'chart',
            roles: ['developer', 'admin', 'editor'],
            noCache: false,
            affix: false,
            breadcrumb: false,
            'system_id': 'systemManagement_role-manage_EmButtonGroup',
            'system_type': 'EmButtonGroup',
            'groupType': 'group',
            'class': '',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': ''
          },
          children: [
            {
              id: 11211,
              pid: 1121,
              weight: 200,
              path: 'ElButton1',
              component: () => import('@/views/demo/index.vue'),
              name: 'ElButton',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '添加',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'systemManagement_role-manage_EmButtonGroup_item1',
                'system_type': 'ElButton',
                'type': 'primary',
                'size': '',
                'class': '',
                'disabled': false,
                'control_type': 'tree',
                'control_id': 'systemManagement_role-manage_emTree',
                'fn': 'update',
                'fn_type': ''
              }
            },
            {
              id: 11212,
              pid: 1121,
              weight: 200,
              path: 'ElButton2',
              component: () => import('@/views/demo/index.vue'),
              name: 'ElButton',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '展开',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'systemManagement_role-manage_EmButtonGroup_item2',
                'system_type': 'ElButton',
                'type': 'primary',
                'size': '',
                'class': '',
                'disabled': false,
                'control_type': 'tree',
                'control_id': 'systemManagement_role-manage_emTree',
                'fn': '',
                'fn_type': ''
              }
            },
            {
              id: 11213,
              pid: 1121,
              weight: 200,
              path: 'ElButton3',
              component: () => import('@/views/demo/index.vue'),
              name: 'ElButton',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '获取角色权限',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'systemManagement_role-manage_EmButtonGroup_item3',
                'system_type': 'ElButton',
                'type': 'primary',
                'size': '',
                'class': '',
                'disabled': false,
                'control_type': 'tree',
                'control_id': 'systemManagement_role-manage_emTree',
                'fn': 'getRoutePermission',
                'fn_type': ''
              }
            }

          ]
        },
        {
          id: 1122,
          pid: 112,
          weight: 200,
          path: 'EmTree',
          component: () => import('@/views/demo/index.vue'),
          redirect: '',
          name: 'EmTree',
          hidden: true,
          alwaysShow: false,
          meta: {
            title: '角色',
            icon: 'chart',
            roles: ['developer', 'admin', 'editor'],
            noCache: false,
            affix: false,
            breadcrumb: false,
            'system_id': 'systemManagement_role-manage_emTree',
            'system_type': 'EmTree',
            'propsChildren': 'children',
            'propsLabel': 'zhName',
            'checkbox': false,
            'expandAll': true,
            'buttons': true,
            'treeDataType': 'query',
            'treeDataUrl': '/user/role/selectRole',
            'treeDataParams_OBJ': {},
            'checkedKeysType': '',
            'checkedKeysUrl': '',
            'checkedKeysParams_OBJ': {},
            'updateCheckedType': '',
            'updateCheckedUrl': '',
            'updateCheckedParams_OBJ': {},
            'appendUrl': '/user/role/addRole',
            'appendSuccess': '',
            'removeUrl': '/user/role/deleteRole',
            'updateUrl': '/user/role/updateRole',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': ''
          }
        },
        {
          id: 1123,
          pid: 112,
          weight: 200,
          path: 'role-manage_form_L',
          component: () => import('@/views/demo/index.vue'),
          redirect: '',
          name: '',
          hidden: true,
          alwaysShow: false,
          meta: {
            title: 'Menu 1-2-2',
            'system_id': 'nav_systemManage_permissions_win_emForm',
            'system_type': 'win_component_form',
            'paneType': 'paneR',
            'winOffset': 0,
            'winSpan': 48,
            'component': 'emForm',
            'labelWidth': '80px',
            'class': 'form-table',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': ''
          }
        },
        {
          id: 1124,
          pid: 112,
          path: 'role-manage_form_R',
          component: () => import('@/views/demo/index.vue'),
          name: '',
          hidden: true,
          meta: {
            title: 'Menu 1-2-2'
          }
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
