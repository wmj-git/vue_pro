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
            'temp': {
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
    }
  ]
}
export default index
