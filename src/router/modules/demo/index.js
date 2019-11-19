import Layout from '@/layout'

const index = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/index',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: 'demo',
    icon: 'component'
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
        roles: ['developer', 'admin', 'editor'], // 权限
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
      path: 'classInfo',
      component: () => import('@/views/em/school-service/classInfo/classInfo'),
      name: 'ClassInfo',
      meta: {
        title: '班级管理',
        icon: 'chart',
        'system_id': 'schoolService_classInfo_ClassInfo',
        'system_type': 'ClassInfo'
      },
      children: [
        {
          path: 'emButton',
          component: () => import('@/views/demo/index.vue'),
          name: 'EmButton',
          hidden: true,
          meta: {
            title: '操作按钮组',
            icon: 'el-icon-plus',
            roles: ['developer', 'admin', 'editor'],
            'system_id': 'schoolService_classInfo_emButton_EmButton',
            'system_type': 'EmButton'
          },
          children: [
            {
              path: 'emButton',
              component: () => import('@/views/demo/index.vue'),
              name: 'EmButton',
              hidden: true,
              meta: {
                title: '添加',
                type: 'primary',
                icon: 'el-icon-plus',
                size: 'mini',
                roles: ['developer', 'admin', 'editor'],
                'system_id': 'schoolService_classInfo_emButton_EmButton1',
                'system_type': 'EmButton',
                'fn': 'handleCreate'
              }
            },
            {
              path: 'emButton',
              component: () => import('@/views/demo/index.vue'),
              name: 'EmButton',
              hidden: true,
              meta: {
                title: '删除',
                type: 'danger',
                size: 'mini',
                icon: 'el-icon-delete',
                roles: ['developer', 'admin', 'editor'],
                'system_id': 'schoolService_classInfo_emButton_EmButton2',
                'system_type': 'EmButton',
                'fn': 'handleDelete'
              }
            }
          ]
        }, // 操作按钮
        {
          path: 'emTable',
          component: () => import('@/views/demo/index.vue'),
          name: 'EmTable',
          hidden: true,
          meta: {
            title: '表格',
            icon: '',
            'system_id': 'schoolService_classInfo_EmTable',
            'system_type': 'EmTable',
            'queryUrl': '/school/class/queryAllByPage',
            'updateUrl': '/school/class/update',
            'removeUrl': '/school/class/deletes',
            tableHeader: [
              {
                label: '班级编号',
                key: 'classSerialNumber'
              },
              {
                label: '班级名称',
                key: 'name'
              },
              {
                label: '界别',
                key: 'boundary'
              },
              {
                label: '年级',
                key: 'gradeName'
              },
              {
                label: '学校组织编码',
                key: 'siOrgCode'
              }
            ],
            pageOne: false,
            total: 0,
            ids: [],
            listQuery: {
              page: 1,
              limit: 10
            }
          }
        }, // 表格
        {
          path: 'emDialog',
          component: () => import('@/views/demo/index.vue'),
          name: 'EmDialog',
          hidden: true,
          meta: {
            'title': '弹框',
            'icon': '',
            'system_id': 'schoolService_classInfo_EmDialog',
            'system_type': 'EmDialog',
            'fn': '',
            'selectUrl': '/school/school/queryAllByPage',
            'appendUrl': '/school/class/add',
            graduateStatus: [
              { label: '在读', value: 1 },
              { label: '结业', value: 0 },
              { label: '遣散', value: -1 }],
            textMap: {
              update: '修改班级',
              create: '添加班级'
            },
            'dialogStatus': '',
            'dialogFormVisible': false,
            temp: {
              name: '',
              address: '',
              orgCode: '',
              siOrgCode: '',
              tel: '',
              gradeName: ''
            }
          }
        } // 弹框
      ]
    },
    {
      path: 'parentInfo',
      component: () => import('@/views/em/school-service/parentInfo/parentInfo'),
      name: 'ParentInfo',
      meta: {
        title: '家长管理',
        icon: 'chart',
        'system_id': 'schoolService_parentInfo_ParentInfo',
        'system_type': 'ParentInfo'
      },
      children: [
        {
          path: 'emButton',
          component: () => import('@/views/demo/index.vue'),
          name: 'EmButton',
          hidden: true,
          meta: {
            title: '操作按钮组',
            icon: 'el-icon-plus',
            roles: ['developer', 'admin', 'editor'],
            'system_id': 'schoolService_parentInfo_emButton_EmButton',
            'system_type': 'buttonGroupItem',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': ''
          },
          children: [
            {
              path: 'emButton',
              component: () => import('@/views/demo/index.vue'),
              name: 'EmButton',
              hidden: true,
              meta: {
                title: '添加',
                type: 'primary',
                icon: 'el-icon-plus',
                size: 'mini',
                roles: ['developer', 'admin', 'editor'],
                'system_id': 'schoolService_parentInfo_emButton_EmButton1',
                'system_type': 'buttonGroup',
                'control_type': 'dialog',
                'control_id': 'schoolService_classInfo_EmDialog', // 弹框显示的system_id
                'fn': 'changeDialogVisible', // 直接调用弹框显示的方法
                'fn_type': 'ParentInfo_EmForm_addForm'
              }
            },
            {
              path: 'emButton',
              component: () => import('@/views/demo/index.vue'),
              name: 'EmButton',
              hidden: true,
              meta: {
                title: '删除',
                type: 'danger',
                size: 'mini',
                icon: 'el-icon-delete',
                roles: ['developer', 'admin', 'editor'],
                'system_id': 'schoolService_parentInfo_emButton_EmButton2',
                'system_type': 'buttonGroup',
                'control_type': 'table',
                'control_id': 'schoolService_parent-Info_emTable',
                'fn': 'handleDelete',
                'fn_type': 'ParentInfo_EmTable_deleteData'
              }
            }
          ]
        }, // 操作按钮
        {
          path: 'emTable',
          component: () => import('@/views/demo/index.vue'),
          name: 'EmTable',
          hidden: true,
          meta: {
            title: '表格',
            icon: '',
            'system_id': 'schoolService_classInfo_EmTable',
            'system_type': 'dataItem',
            'queryUrl': '/school/parent/queryAllByPage',
            'updateUrl': '/school/parent/update',
            'removeUrl': '/school/parent/deletes',
            tableHeader: [
              {
                label: '家长姓名',
                key: 'parentName'
              },
              {
                label: '家长年龄',
                key: 'parentAge'
              },
              {
                label: '家长电话',
                key: 'parentTel'
              }
            ],
            pageOne: false,
            total: 0,
            ids: [],
            listQuery: {
              page: 1,
              limit: 10
            }
          }
        }, // 表格
        {
          path: 'emDialog',
          component: () => import('@/views/demo/index.vue'),
          name: 'EmDialog',
          hidden: true,
          meta: {
            'title': '弹框',
            'icon': '',
            'span': '48',
            'labelPosition': 'left',
            'labelWidth': '80px',
            'system_id': 'schoolService_classInfo_EmDialog',
            'system_type': 'formItem',
            'selectUrl': '/school/student/queryAllByPage',
            'appendUrl': '/school/parent/add',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': '',
            'changeDialogVisibleControlType': 'ParentInfo_dialogShowControlType_changeDialogVisible',
            'changeDialogVisibleControlId': 'ParentInfo_dialogShow_changeDialogVisible',
            'changeDialogVisibleControlFn': 'changeDialogVisible',
            'changeDialogVisibleControlFnType': 'ParentInfo_EmDialog_changeDialogVisible',
            textMap: {
              update: '修改家长信息',
              create: '添加家长信息'
            },
            'dialogStatus': '',
            temp: {
              name: '',
              address: '',
              orgCode: '',
              siOrgCode: '',
              tel: '',
              gradeName: ''
            }
          },
          children: [
            {
              path: 'input1',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              meta: {
                'title': '家长姓名',
                'icon': '',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'schoolService_parentInfo_input1',
                'system_type': 'formItem',
                'span': '20',
                'itemType': 'input',
                'valueKey': 'parentName',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                }
              }
            },
            {
              path: 'select1',
              component: () => import('@/views/demo/index.vue'),
              name: 'select',
              hidden: true,
              meta: {
                'title': '家长性别',
                'icon': '',
                'selectWidth': '80px',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'schoolService_parentInfo_input1',
                'system_type': 'formItem',
                'span': '20',
                'offset': '1',
                'itemType': 'select',
                'valueKey': 'parentSex',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'options_OBJ': {
                  'data': [
                    { 'label': '女', 'value': 2 },
                    { 'label': '男', 'value': 3 }
                  ]
                }
              }
            },
            {
              path: 'select2',
              component: () => import('@/views/demo/index.vue'),
              name: 'select',
              hidden: true,
              meta: {
                'title': '学生id',
                'icon': '',
                'selectWidth': '80px',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'schoolService_parentInfo_input1',
                'system_type': 'formItem',
                'span': '20',
                'offset': '1',
                'itemType': 'select',
                'valueKey': 'studentIds',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                },
                'options_OBJ': {
                  'data': []
                }
              }
            },
            {
              path: 'input2',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              meta: {
                'title': '家长年龄',
                'icon': '',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'schoolService_parentInfo_input1',
                'system_type': 'formItem',
                'span': '20',
                'itemType': 'input',
                'valueKey': 'parentAge',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                }
              }
            },
            {
              path: 'input3',
              component: () => import('@/views/demo/index.vue'),
              name: 'input',
              hidden: true,
              meta: {
                'title': '联系方式',
                'icon': '',
                roles: ['developer', 'admin', 'editor'],
                noCache: false,
                affix: false,
                breadcrumb: false,
                'system_id': 'schoolService_parentInfo_input1',
                'system_type': 'formItem',
                'span': '20',
                'offset': '1',
                'itemType': 'input',
                'valueKey': 'parentTel',
                'defaultValue': '',
                'placeholder': '',
                'disabled': false,
                'validate_OBJ': {
                  'data': [
                    { 'required': true, 'message': '请输入', 'trigger': 'change' }
                  ]
                }
              }
            }
          ]
        } // 弹框
      ]
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
                title: '描述',
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
                'primary': '',
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
                'primary': '',
                'class': '',
                'disabled': false,
                'control_type': 'default',
                'control_id': '',
                'fn': 'onReset',
                'fn_type': ''
              }
            }
          ]
        }
      ]
    }
  ]
}
export default index
