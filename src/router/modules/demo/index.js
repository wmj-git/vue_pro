import Layout from '@/layout'

const index = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/index',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: 'demo',
    icon: 'component',
    roles: ['developer', 'default'] // 显示模式
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/demo/index'),
      name: 'demo',
      hidden: false,
      alwaysShow: false,
      meta: {
        title: 'demo',
        icon: 'chart',
        roles: ['developer', 'default'], // 显示模式
        noCache: false, // 页面是否有缓存机制
        affix: false, // 是否固定在切换标签面板
        breadcrumb: false, // 是否显示在路由导航
        'system_id': 'systemManagement_role-manage_EmButtonGroup', // 功能对象id
        'system_type': 'EmButtonGroup', // 功能类型
        'control_type': '', // 控制组件类型
        'control_id': '', //
        'fn': '',
        'fn_type': ''
      },
      children: [
        {
          path: 'm-1',
          component: () => import('@/views/demo/index'),
          name: 'm-1',
          hidden: false,
          meta: {
            title: 'm-1-1',
            icon: 'user',
            noCache: true
          }
        },
        {
          path: 'm-2',
          component: () => import('@/views/demo/index'),
          name: 'm-2',
          hidden: false,
          meta: {
            title: 'm-1-1',
            icon: 'user',
            noCache: true
          }
        }
      ]
    },
    {
      id: 0,
      pid: 0,
      weight: 200,
      path: 'BaseTable',
      component: () => import('@/views/em/baseTable/baseTable'),
      redirect: '',
      name: 'BaseTable',
      hidden: false,
      alwaysShow: false,
      meta: {
        title: '基本表',
        icon: 'chart',
        roles: ['default'],
        noCache: true,
        affix: false,
        breadcrumb: true,
        'system_id': 'system_baseTable',
        'system_type': 'BaseTable',
        'minPercent': '10',
        'defaultPercent': '0',
        'paneL': true,
        'paneR': true,
        'control_type': '',
        'control_id': '',
        'fn': '',
        'fn_type': ''
      },
      children: [
        {
          id: 0,
          pid: 0,
          weight: 200,
          path: 'EmTableGroup',
          component: () => import('@/views/demo/index.vue'),
          redirect: '',
          name: 'EmTableGroup',
          hidden: true,
          alwaysShow: false,
          meta: {
            title: '表数据',
            icon: 'chart',
            roles: ['default'],
            noCache: false,
            affix: false,
            breadcrumb: false,
            'system_id': 'system_baseTable_p2',
            'system_type': 'paneR',
            'componentType': 'emTableGroup',
            'offset': '',
            'span': '48',
            'shadow': 'hover',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': '',
            'fn_set': {}
          },
          children: [
            {
              id: 0,
              pid: 0,
              weight: 200,
              path: 'system_baseTable_form_LL',
              component: () => import('@/views/demo/index.vue'),
              redirect: '',
              name: 'system_baseTable_form_LL',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '表格表单',
                icon: 'chart',
                roles: ['default'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'system_baseTable_p2_emForm1',
                'system_type': 'tableGroupItem',
                'componentType': 'emForm',
                'offset': '',
                'span': '48',
                'labelPosition': '',
                'labelWidth': '',
                'statusIcon': false,
                'class': '',
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              },
              children: [
                {
                  id: 11234,
                  pid: 1123,
                  weight: 200,
                  path: 'input6',
                  component: () => import('@/views/demo/index.vue'),
                  name: 'input',
                  hidden: true,
                  alwaysShow: false,
                  meta: {
                    title: '',
                    icon: '',
                    roles: ['default', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'nav_systemManage_permissions_win_emForm_formItem7',
                    'system_type': 'formItem',
                    'offset': '',
                    'span': '8',
                    'itemType': 'input',
                    'valueKey': 'parentName',
                    'defaultValue': '',
                    'placeholder': '姓名',
                    'disabled': false,
                    'validate_OBJ': {
                      'data': [
                        { 'required': false, 'message': '请输入', 'trigger': 'change' }
                      ]
                    },
                    'control_type': '',
                    'control_id': '',
                    'fn': '',
                    'fn_type': '',
                    'fn_set': {}
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
                    title: '查询',
                    icon: 'el-icon-star-off',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'nav_systemManage_permissions_win_emForm_formItem9',
                    'system_type': 'formItem',
                    'offset': '1',
                    'span': '6',
                    'itemType': 'button',
                    'buttonType': '',
                    'class': '',
                    'disabled': false,
                    'control_type': 'BaseTable_EmTableGroup_EmForm_ControlType--BaseTable_EmTableGroup_EmTable_queryFn',
                    'control_id': 'system_baseTable_p2_emTable1',
                    'fn': 'queryFn',
                    'fn_type': 'BaseTable_EmTableGroup_EmTable_queryFn',
                    'fn_set': {

                    }
                  }
                },
                {
                  id: 11236,
                  pid: 1123,
                  weight: 200,
                  path: 'input12',
                  component: () => import('@/views/demo/index.vue'),
                  name: 'input',
                  hidden: true,
                  alwaysShow: false,
                  meta: {
                    title: '添加',
                    icon: 'el-icon-star-off',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'nav_systemManage_permissions_win_emForm_formItem10',
                    'system_type': 'formItem',
                    'offset': '0',
                    'span': '6',
                    'itemType': 'button',
                    'buttonType': '',
                    'class': '',
                    'disabled': false,
                    'control_type': 'BaseTable_EmTableGroup_EmForm_ControlType--BaseTable_EmDialog_openFn',
                    'control_id': 'system_baseTable_p2_EmDialog1',
                    'fn': 'openFn',
                    'fn_type': 'BaseTable_EmDialog_openFn',
                    'fn_set': {
                      'title': '添加家长',
                      'dialogVisible': true,
                      'width': '540px'
                    },
                    'controlGroup': [
                      {
                        'fn': 'onReset',
                        'fn_set': {},
                        'fn_type': 'BaseTable_EmForm_onReset',
                        'control_id': 'system_baseTable_p2_EmDialog1_emForm1',
                        'control_type': 'TimeFn'
                      }
                    ]
                  }
                }
              ]
            },
            {
              id: 0,
              pid: 0,
              weight: 200,
              path: 'system_baseTable_table_LL',
              component: () => import('@/views/demo/index.vue'),
              redirect: '',
              name: 'system_baseTable_table_LL',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '表格数据',
                icon: 'chart',
                roles: ['default'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'system_baseTable_p2_emTable1',
                'system_type': 'tableGroupItem',
                'componentType': 'emTable',
                'offset': '',
                'span': '48',
                queryUrl: '/school/parent/queryAllByPage',
                appendUrl: '/school/parent/add',
                removeUrl: '/school/parent/deletes',
                updateUrl: '/school/parent/update',
                maxHeight: '280',
                tableHeader: [
                  {
                    'label': 'id',
                    'prop': 'id',
                    'width': 100
                  },
                  {
                    'label': '年龄',
                    'prop': 'parentAge',
                    'width': 100
                  },
                  {
                    'label': '姓名',
                    'prop': 'parentName',
                    'width': 100
                  },
                  {
                    'label': '性别',
                    'prop': 'parentSex',
                    'width': 100
                  },
                  {
                    'label': '联系电话',
                    'prop': 'parentTel',
                    'width': ''
                  }
                ],
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              },
              children: [
                {
                  id: 11236,
                  pid: 1123,
                  weight: 200,
                  path: 'input12',
                  component: () => import('@/views/demo/index.vue'),
                  name: 'input12',
                  hidden: true,
                  alwaysShow: false,
                  meta: {
                    title: '编辑',
                    icon: 'el-icon-star-off',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'system_baseTable_p2_emTable1_columnBtn1',
                    'system_type': 'columnBtn',
                    'control_type': 'BaseTable_EmTableGroup_EmTable_columnBtnClick--BaseTable_EmDialog_openFn',
                    'control_id': 'system_baseTable_p2_EmDialog1',
                    'fn': 'openFn',
                    'fn_type': 'BaseTable_EmDialog_openFn',
                    'fn_set': {
                      'title': '编辑家长信息',
                      'dialogVisible': true,
                      'width': '540px'
                    },
                    'controlGroup': [
                      {
                        'fn': 'setForm',
                        'fn_set': {
                          type: 'tableColumnBtn'
                        },
                        'fn_type': 'BaseTable_EmForm_setForm',
                        'control_id': 'system_baseTable_p2_EmDialog1_emForm1',
                        'control_type': 'TimeFn'
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          id: 0,
          pid: 0,
          weight: 200,
          path: 'EmDialog',
          component: () => import('@/views/demo/index.vue'),
          redirect: '',
          name: 'EmDialog',
          hidden: true,
          alwaysShow: false,
          meta: {
            title: '添加-窗口',
            icon: 'chart',
            roles: ['default'],
            noCache: false,
            affix: false,
            breadcrumb: false,
            'system_id': 'system_baseTable_p2_EmDialog1',
            'system_type': 'ContainerBox',
            'componentType': 'emDialog',
            'dialogVisible': false,
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': '',
            'fn_set': {}
          },
          children: [
            {
              id: 1124,
              pid: 112,
              weight: 200,
              path: 'role-manage_form_LL',
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
                'system_id': 'system_baseTable_p2_EmDialog1_emForm1',
                'system_type': 'ContainerItem',
                'componentType': 'emForm',
                'offset': '',
                'span': '48',
                'labelPosition': 'top',
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
                    title: '年龄',
                    icon: 'chart',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'system_baseTable_p2_EmDialog1_emForm1_emForm_formItem1',
                    'system_type': 'formItem',
                    'offset': '',
                    'span': '16',
                    'itemType': 'input',
                    'valueKey': 'parentAge',
                    'defaultValue': 123,
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
                  id: 11231,
                  pid: 1123,
                  weight: 200,
                  path: 'input2',
                  component: () => import('@/views/demo/index.vue'),
                  name: 'input2',
                  hidden: true,
                  alwaysShow: false,
                  meta: {
                    title: '姓名',
                    icon: 'chart',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'system_baseTable_p2_EmDialog1_emForm1_emForm_formItem2',
                    'system_type': 'formItem',
                    'offset': '',
                    'span': '16',
                    'itemType': 'input',
                    'valueKey': 'parentName',
                    'defaultValue': '姓名',
                    'placeholder': '姓名',
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
                  id: 11233,
                  pid: 1123,
                  weight: 200,
                  path: 'input3',
                  component: () => import('@/views/demo/index.vue'),
                  name: 'input3',
                  hidden: true,
                  alwaysShow: false,
                  meta: {
                    title: '性别',
                    icon: 'chart',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'system_baseTable_p2_EmDialog1_emForm1_emForm_formItem3',
                    'system_type': 'formItem',
                    'offset': '',
                    'span': '16',
                    'itemType': 'select',
                    'valueKey': 'parentSex',
                    'defaultValue': 1,
                    'placeholder': '请选择一项',
                    'disabled': false,
                    'validate_OBJ': {
                      'data': [
                        { 'required': true, 'message': '请输入', 'trigger': 'change' }
                      ]
                    },
                    'options_OBJ': {
                      'data': [
                        { 'label': '男', 'value': 1 },
                        { 'label': '女', 'value': 2 }
                      ]
                    },
                    'control_type': '',
                    'control_id': '',
                    'fn': '',
                    'fn_type': ''
                  }
                },
                {
                  id: 11231,
                  pid: 1123,
                  weight: 200,
                  path: 'input4',
                  component: () => import('@/views/demo/index.vue'),
                  name: 'input4',
                  hidden: true,
                  alwaysShow: false,
                  meta: {
                    title: '联系电话',
                    icon: 'chart',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'system_baseTable_p2_EmDialog1_emForm1_emForm_formItem4',
                    'system_type': 'formItem',
                    'offset': '',
                    'span': '48',
                    'itemType': 'input',
                    'valueKey': 'parentTel',
                    'defaultValue': 123,
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
                  id: 11236,
                  pid: 1123,
                  weight: 190,
                  path: 'input12',
                  component: () => import('@/views/demo/index.vue'),
                  name: 'input',
                  hidden: true,
                  alwaysShow: false,
                  meta: {
                    title: '取消',
                    icon: 'el-icon-star-off',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'nav_systemManage_permissions_win_emForm_formItem10',
                    'system_type': 'formItem',
                    'offset': '6',
                    'span': '12',
                    'itemType': 'button',
                    'buttonType': '',
                    'class': '',
                    'disabled': false,
                    'control_type': 'BaseTable_EmForm_btnClick--BaseTable_EmDialog_closeFn',
                    'control_id': 'system_baseTable_p2_EmDialog1',
                    'fn': 'closeFn',
                    'fn_type': 'BaseTable_EmDialog_closeFn'
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
                    title: '提交',
                    icon: 'el-icon-star-off',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'nav_systemManage_permissions_win_emForm_formItem9',
                    'system_type': 'formItem',
                    'offset': '0',
                    'span': '12',
                    'itemType': 'button',
                    'buttonType': '',
                    'class': '',
                    'disabled': false,
                    'control_type': 'BaseTable_EmForm_btnClick--BaseTable_EmTableGroup_EmTable_updateFn',
                    'control_id': 'system_baseTable_p2_emTable1',
                    'fn': 'updateFn',
                    'fn_type': 'BaseTable_EmTableGroup_EmTable_updateFn'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 0,
      pid: 0,
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
        'form_R': true,
        'control_type': '',
        'control_id': '',
        'fn': '',
        'fn_type': ''
      },
      children: [
        {
          id: 1120,
          pid: 112,
          weight: 200,
          path: 'EmDialog',
          component: () => import('@/views/demo/index.vue'),
          redirect: '',
          name: 'EmDialog',
          hidden: true,
          alwaysShow: false,
          meta: {
            title: '权限-窗口',
            icon: 'chart',
            roles: ['developer', 'admin', 'editor'],
            noCache: false,
            affix: false,
            breadcrumb: false,
            'system_id': 'systemManagement_role-manage_emDialog1',
            'system_type': 'ContainerBox',
            'componentType': 'emDialog',
            'width': '480px',
            'clear': true,
            'dialogVisible': false,
            'modal': true,
            'appendToBody': true,
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': '',
            'fn_set': {}
          },
          children: [
            {
              id: 0,
              pid: 1,
              weight: 200,
              path: 'EmTree',
              component: () => import('@/views/demo/index.vue'),
              redirect: '',
              name: 'EmTree',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '权限',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'systemManagement_role-manage_emTree',
                'system_type': 'ContainerItem',
                'offset': '',
                'span': '48',
                'maxHeight': '380px',
                'componentType': 'emTree',
                'propsChildren': 'children',
                'propsLabel': 'name',
                'checkbox': true,
                'expandAll': true,
                'buttons': false,
                'treeDataType': 'query',
                'treeDataUrl': '/user/resources/selectResources',
                'treeDataParams_OBJ': {},
                'routePermissionUrl': '/user/role/getResources',
                'setRoutePermissionUrl': '/user/role/roleAddResources',
                'control_type': '',
                'control_id': '',
                'fn': '',
                'fn_type': ''
              }
            },
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
                'system_type': 'ContainerItem',
                'componentType': 'emButtonGroup',
                'offset': '28',
                'span': '20',
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
                    title: '取消',
                    icon: 'chart',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'systemManagement_role-manage_emDialog1_EmButtonGroup_item1',
                    'system_type': 'buttonGroup',
                    'buttonType': 'primary',
                    'size': '',
                    'class': '',
                    'disabled': false,
                    'control_type': 'dialogClose',
                    'control_id': 'systemManagement_role-manage_emDialog1',
                    'fn': 'closeFn',
                    'fn_type': 'RoleManage_EmDialog_closeFn',
                    'fn_set': {}
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
                    title: '提交',
                    icon: 'chart',
                    roles: ['developer', 'admin', 'editor'],
                    noCache: false,
                    affix: false,
                    breadcrumb: false,
                    'system_id': 'systemManagement_role-manage_emDialog1_EmButtonGroup_item2',
                    'system_type': 'buttonGroup',
                    'type': 'primary',
                    'size': '',
                    'class': '',
                    'disabled': false,
                    'control_type': 'form',
                    'control_id': 'nav_systemManage_permissions_win_emForm1',
                    'fn': 'fn',
                    'fn_type': 'RoleManage_EmForm_fn',
                    'fn_set': {
                      'meta': {
                        'control_type': 'RoleManage_EmForm_ControlType--RoleManage_EmTree_updateCheckedKeys',
                        'control_id': 'systemManagement_role-manage_emTree',
                        'fn': 'updateCheckedKeys',
                        'fn_type': 'RoleManage_EmTree_updateCheckedKeys',
                        'fn_set': {}
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
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
            'system_type': 'buttonGroupItem_ContainerItem',
            'componentType': 'emButtonGroup',
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
                title: '表单提交',
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
                'control_type': 'form',
                'control_id': 'nav_systemManage_permissions_win_emForm1',
                'fn': 'onSubmit',
                'fn_type': 'default'
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
            'propsLabel': 'description',
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
            'setRoutePermissionUrl': '',
            'handleNodeClickControlType': 'RoleManage_EmTree_handleNodeClickControlType--RoleManage_EmForm_setForm',
            'handleNodeClickControlId': 'nav_systemManage_permissions_win_emForm1',
            'handleNodeClickFn': 'setForm',
            'handleNodeClickFnType': 'RoleManage_EmForm_setForm',
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
                'buttonType': '',
                'class': '',
                'disabled': false,
                'control_type': '',
                'control_id': '',
                'fn': 'onSubmit',
                'fn_type': ''
              }
            }
          ]
        },
        {
          id: 1124,
          pid: 112,
          weight: 200,
          path: 'role-manage_form_LL',
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
            'system_id': 'nav_systemManage_permissions_win_emForm1',
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
                title: 'ID',
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
                'defaultValue': 'none',
                'placeholder': '',
                'disabled': true,
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
                title: '角色名称',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem2',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'input',
                'valueKey': 'name',
                'defaultValue': '12321',
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
              id: 11233,
              pid: 1123,
              weight: 200,
              path: 'input3',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '中文名称',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem3',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'input',
                'valueKey': 'zhName',
                'defaultValue': '123',
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
              id: 11234,
              pid: 1123,
              weight: 200,
              path: 'input5',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '角色编码',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem5',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'input',
                'valueKey': 'roleCode',
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
              id: 11234,
              pid: 1123,
              weight: 200,
              path: 'input6',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '权重',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem6',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'input',
                'valueKey': 'weight',
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
              id: 11234,
              pid: 1123,
              weight: 200,
              path: 'input6',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '父级ID',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem7',
                'system_type': 'formItem',
                'offset': '',
                'span': '16',
                'itemType': 'input',
                'valueKey': 'pid',
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
                'fn_type': '',
                'fn_set': {}
              }
            },
            {
              id: 11234,
              pid: 1123,
              weight: 200,
              path: 'input6',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '全称',
                icon: 'chart',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem8',
                'system_type': 'formItem',
                'offset': '',
                'span': '48',
                'itemType': 'textarea',
                'valueKey': 'description',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'autosize_OBJ': {
                  'minRows': 2, 'maxRows': 6
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
                title: '提交',
                icon: 'el-icon-star-off',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem9',
                'system_type': 'formItem',
                'offset': '6',
                'span': '8',
                'itemType': 'button',
                'buttonType': '',
                'class': '',
                'disabled': false,
                'control_type': 'RoleManage_EmForm_ControlType--RoleManage_EmTree_update',
                'control_id': 'systemManagement_role-manage_emTree',
                'fn': 'update',
                'fn_type': 'RoleManage_EmTree_update'
              }
            },
            {
              id: 11236,
              pid: 1123,
              weight: 200,
              path: 'input12',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '重置',
                icon: 'el-icon-star-off',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem10',
                'system_type': 'formItem',
                'offset': '0',
                'span': '8',
                'itemType': 'button',
                'buttonType': '',
                'class': '',
                'disabled': false,
                'control_type': 'default',
                'control_id': '',
                'fn': 'onReset',
                'fn_type': ''
              }
            },
            {
              id: 11236,
              pid: 1123,
              weight: 200,
              path: 'input13',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              alwaysShow: false,
              meta: {
                title: '分配权限',
                icon: 'el-icon-star-off',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'nav_systemManage_permissions_win_emForm_formItem11',
                'system_type': 'formItem',
                'offset': '0',
                'span': '8',
                'itemType': 'button',
                'buttonType': '',
                'class': '',
                'disabled': false,
                'control_type': 'RoleManage_EmForm_ControlType--RoleManage_EmDialog_openFn',
                'control_id': 'systemManagement_role-manage_emDialog1',
                'fn': 'openFn',
                'fn_type': 'RoleManage_EmDialog_openFn',
                'fn_set': {
                  dialogVisible: true,
                  title: '分配权限'
                },
                'controlGroup': [
                  {
                    'control_type': 'TimeFn',
                    'control_id': 'systemManagement_role-manage_emTree',
                    'fn_type': 'RoleManage_EmTree_setCheckedKeys',
                    'fn': 'setCheckedKeys',
                    'fn_set': {}
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
export default index
