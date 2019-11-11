// 树型数据转换
export function treeWeight(_nodes) {
  function compare(obj1, obj2) {
    const val1 = obj1.weight
    const val2 = obj2.weight
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }

  const datalist = _nodes

  if (datalist instanceof Array) {
    datalist.sort(compare).forEach(a => {
      if (a.children && (a.children instanceof Array)) {
        treeWeight(a.children)
      }
    })
  }
  return datalist
}

export function treeStructure(_nodes) {
  const nodes = _nodes

  // sort
  function cmp(a, b) {
    return a.pId - b.pId
  }

  nodes.sort(cmp)

  const midObj = {}
  // 从后向前遍历
  for (let i = nodes.length - 1; i >= 0; i--) {
    const nowPid = nodes[i].pId
    const nowId = nodes[i].id
    // 建立当前节点的父节点的children 数组
    if (midObj[nowPid]) {
      midObj[nowPid].unshift(nodes[i])
    } else {
      midObj[nowPid] = []
      midObj[nowPid].unshift(nodes[i])
    }
    // 将children 放入合适的位置
    if (midObj[nowId]) {
      nodes[i].children = midObj[nowId]
      delete midObj[nowId]
    }
  }

  return midObj
}

export function toTree(_nodes) {
  const _Tree = []
  const _data = treeStructure(_nodes)
  for (const _k in _data) {
    _data[_k].forEach(function(_obj) {
      _Tree.push(_obj)
    })
  }
  return treeWeight(_Tree)
}

// 定时器
export class TimeFn {
  constructor(fnName, setFn, clearFn, time) {
    this.fnName = fnName // 定时器名称
    this.setFn = setFn // 循环的方法
    this.clearFn = clearFn // 循环控制方法
    this.time = time // 延迟时间
    this.off = true
  }

  judge() {
    this.run(this.fnName, this.setFn, this.clearFn, this.time)
  }

  run() {
    if (TimeFn.inTimeoutId[this.fnName]) {
      window.clearTimeout(TimeFn.inTimeoutId[this.fnName])
    }
    TimeFn.inTimeoutId[this.fnName] = setTimeout(() => {
      this.setFn()
      if (this.clearFn()) {
        if (this.off) {
          this.judge()
        } else {
          this.off = true
        }
      }
    }, this.time)
  }

  stop() {
    this.off = false
  }
}

TimeFn.inTimeoutId = {}
/*
 // 实例化定时器
const tm2 = new TimeFn("t2", () => {
  console.log("2121212212");
}, () => {
  return true
}, 2500);
 // 运行
tm2.run();
 // 关闭
tm2.stop();
*/

export class FilterTree {
  constructor(_val) {
    this.treeData = _val.treeData
    this.key = _val.key
    this.value = _val.value
    this.res = []
  }

  has(_value, tmp) {
    let _has = null
    switch (this.key.length) {
      case 1:
        if (tmp[this.key[0]]) {
          _has = tmp[this.key[0]] === _value
        } else {
          _has = false
        }
        break
      case 2:
        if (tmp[this.key[0]] && tmp[this.key[0]][this.key[1]]) {
          _has = tmp.meta.system_id === _value ? 1 : 0
          console.log(_has)
        } else {
          _has = false
        }
        break
    }
    return _has
  }

  filter(_treeData, _value) {
    _treeData.forEach(_item => {
      const tmp = { ..._item }
      if (tmp.children) {
        this.filter(tmp.children, _value)
      }
      if (this.has(_value, tmp)) {
        this.res.push(tmp)
      }
    })
    return this.res
  }

  getData() {
    return this.filter(this.treeData, this.value)
  }
}
