
export const staticFormatterMap = {
  // 设备类型
  dataStatus: new Map([
    [1, '启用'],
    [0, '禁用']
  ]),
  orgType: new Map([
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
  ])
}

