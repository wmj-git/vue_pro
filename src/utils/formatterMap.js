
import { timestampToTime } from './tool'

export const staticFormatterMap = {
  // 设备类型
  dataStatus: new Map([
    [1, '启用'],
    [0, '禁用']
  ]),
  orgType: new Map([ // 组织类型
    [2, '省教委'],
    [3, '市教委'],
    [4, '县教委'],
    [5, '学校']
  ]),
  sex: new Map([ // 教师性别
    [2, '女'],
    [1, '男'],
    [3, '未知']
  ]),
  tncumbency: new Map([ // 教师任职状态
    [1, '在职'],
    [0, '离职'],
    [-1, '开除']
  ]),
  parentSex: new Map([ // 家长性别
    [2, '女'],
    [1, '男'],
    [3, '未知']
  ]),
  studentSex: new Map([ // 学生性别
    [2, '女'],
    [1, '男'],
    [3, '未知']
  ]),
  kinshipName: new Map([ // 学生与家长的亲属关系
    ['dad', '爸爸'],
    ['mom', '妈妈'],
    ['grandpa', '爷爷'],
    ['grandma', '奶奶'],
    ['grandFa', '外公'],
    ['grandMo', '外婆'],
    ['other', '其他']
  ]),
  messageType: new Map([ // 通知信息类型
    [5, '校内SOS报警消息'],
    [6, '火灾报警消息'],
    [8, 'SOS学校两公里外'],
    [10, '通知消息'],
    [12, '电子围栏报警'],
    [13, '系统消息']
  ]),
  weekNum: new Map([ // 通知信息类型
    [1, '周一'],
    [2, '周二'],
    [3, '周三'],
    [4, '周四'],
    [5, '周五'],
    [6, '周六'],
    [7, '周日']
  ]),
  isRead: new Map([ // 消息状态
    [0, '未读'],
    [1, '已读']
  ]),
  category: (val) => { // 流程管理-是否属于本组织
    let _val = ''
    if (val === 'false') {
      _val = '否'
    } else {
      _val = '是'
    }
    return _val
  },
  deploymentId: (val) => { // 流程管理-发布状态
    let _val = ''
    if (!val) {
      _val = '未发布'
    } else {
      _val = '已发布'
    }
    return _val
  },
  lastUpdateTime: (val) => { // 流程管理-最近更新时间
    let _val = null
    _val = timestampToTime(val)
    return _val
  },
  createTime: (val) => { // 流程管理-创建时间
    let _val = null
    _val = timestampToTime(val)
    return _val
  }
}

