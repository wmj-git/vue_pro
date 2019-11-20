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
      component: () => import('@/views/em/school-service/schoolInfo/schoolInfo'),
      name: 'SchoolInfo',
      meta: {
        title: '学校管理',
        roles: ['developer', 'admin', 'editor'],
        icon: 'chart',
        'system_id': 'schoolService_schoolInfo_SchoolInfo',
        'system_type': 'SchoolInfo'
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
            'system_id': 'schoolService_emButton_EmButton',
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
                'system_id': 'schoolService_emButton_EmButton1',
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
                'system_id': 'schoolService_emButton_EmButton2',
                'system_type': 'EmButton',
                'fn': 'handleDelete'
              }
            }
          ]
        }
      ]
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
      path: 'parentInfo11',
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
                title: '查询',
                type: 'primary',
                icon: 'el-icon-search',
                size: 'mini',
                roles: ['developer', 'admin', 'editor'],
                'system_id': 'schoolService_parentInfo_emButton_EmButton1',
                'system_type': 'buttonGroup',
                'control_type': 'table',
                'control_id': 'schoolService_parentInfo_EmTable',
                'fn': 'getList', // 调用查询方法
                'fn_type': 'ParentInfo_EmForm_queryData'
              }
            },
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
                'system_id': 'schoolService_parentInfo_emButton_EmButton2',
                'system_type': 'buttonGroup',
                'control_type': 'table',
                'control_id': 'schoolService_classInfo_EmDialog',
                'fn': 'handleQuery',
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
                'system_id': 'schoolService_parentInfo_emButton_EmButton3',
                'system_type': 'buttonGroup',
                'control_type': 'table',
                'control_id': 'schoolService_parentInfo_EmTable', // 删除选中行（调用emTable中的方法）
                'fn': 'remove',
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
            'system_id': 'schoolService_parentInfo_EmTable',
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
            'selectUrl': '/school/student/queryAllByPage', // 查找学生id
            'appendUrl': '/school/parent/add',
            'control_type': '',
            'control_id': '',
            'fn': '',
            'fn_type': '',
            'changeDialogVisibleControlType': 'ParentInfo_dialogShowControlType_changeDialogVisible',
            'changeDialogVisibleControlId': 'ParentInfo_dialogShow_changeDialogVisible',
            'changeDialogVisibleControlFn': 'changeDialogVisible',
            'changeDialogVisibleControlFnType': 'ParentInfo_EmDialog_changeDialogVisible',
            'textMap': {
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
                'offset': '1',
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
                'offset': '1',
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
      path: 'parentInfo',
      component: () => import('@/views/em/school-service/parentInfo'),
      name: 'ParentInfo',
      meta: {
        title: '家长管理管理',
        icon: 'chart',
        'system_id': 'schoolService_parentInfo_ParentInfo',
        'system_type': 'ParentInfo'
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
    }
  ]
}
export default schoolService
