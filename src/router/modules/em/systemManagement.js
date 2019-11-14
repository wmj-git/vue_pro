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
        'verticalPercent': '30',
        'horizontalPercent': '90',
        'buttonGroup': true,
        'tree': true,
        'form_L': true,
        'form_R': false,
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
            'system_type': 'buttonGroupItem',
            'offset': '',
            'span': '48',
            'groupType': 'default',
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
                'system_type': 'buttonGroup',
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
                'system_type': 'buttonGroup',
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
                'system_type': 'buttonGroup',
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
            'system_type': 'treeItem',
            'offset': '',
            'span': '48',
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
            'routePermissionUrl': '/user/role/getResources',
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
            title: '属性设置',
            icon: 'chart',
            roles: ['developer', 'admin', 'editor'],
            noCache: false,
            affix: false,
            breadcrumb: false,
            'system_id': 'nav_systemManage_permissions_win_emForm',
            'system_type': 'form_L_item',
            'offset': '',
            'span': '48',
            'labelPosition': 'left',
            'labelWidth': '80px',
            'statusIcon': true,
            'class': '',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': ''
          },
          children: [
            {
              id: 11231,
              pid: 1123,
              weight: 200,
              path: 'input1',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '输入框',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem1',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'input',
                'valueKey': 'id',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              }
            },
            {
              id: 11232,
              pid: 1123,
              weight: 200,
              path: 'input2',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '文本域',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem2',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'textarea',
                'valueKey': 'jh',
                'defaultValue': '123',
                'placeholder': '内容',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'autosize_OBJ': {
                  'minRows': 1, 'maxRows': 6
                },
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              }
            },
            {
              id: 11233,
              pid: 1123,
              weight: 200,
              path: 'input3',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '下拉框',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem3',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'select',
                'valueKey': 'kl',
                'defaultValue': '',
                'placeholder': '请选择一项',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'options_OBJ': {
                  'data': [
                    { 'label': '是', 'value': true },
                    { 'label': '否', 'value': false }
                  ]
                },
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              }
            },
            {
              id: 11234,
              pid: 1123,
              weight: 200,
              path: 'input4',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '复合输入',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem4',
                'system_type': 'formItem',
                'offset': '',
                'span': '24',
                'itemType': 'selectInput',
                'valueKey': 'kj1',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'selectWidth': '100px',
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'options_OBJ': {
                  'data': [
                    { 'label': '字段1', 'value': 'kj1' },
                    { 'label': '字段2', 'value': 'kj2' }
                  ]
                },
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              }
            },
            {
              id: 11235,
              pid: 1123,
              weight: 200,
              path: 'input5',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '开关',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem5',
                'system_type': 'formItem',
                'offset': '',
                'span': '8',
                'itemType': 'switch',
                'valueKey': 'jack',
                'defaultValue': false,
                'disabled': false,
                'activeColor': '#124',
                'inactiveColor': '#fde',
                'validate_OBJ': {
                  'data': [
                    { 'required': false, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              }
            },
            {
              id: 11236,
              pid: 1123,
              weight: 200,
              path: 'input6',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '按钮',
                icon: 'el-icon-star-off',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem6',
                'system_type': 'formItem',
                'offset': '0',
                'span': '36',
                'itemType': 'button',
                'primary': '',
                'class': '',
                'disabled': false,
                'control_type': '',
                'control_id': '',
                'fn': 'onSubmit',
                'fn_type': ''
              }
            }
          ]
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
