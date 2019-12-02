// 树型数据转换
function treeWeight(_nodes) {
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

function treeStructure(data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children
  })

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {}
  data.forEach(function(item) {
    map[item.id] = item
  })
  //        console.log(map);
  const val = []
  data.forEach(function(item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map[item.pid]
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item)
    }
  })
  const _val = {}
  val.forEach((_item) => {
    if (_item.pid in _val) {
      _val[_item.pid].push(_item)
    } else {
      _val[_item.pid] = []
      _val[_item.pid].push(_item)
    }
  })
  return _val
  // return val
}

/* function treeStructure(_nodes) {
  const nodes = _nodes

  // sort
  function cmp(a, b) {
    return a.pid - b.pid
  }

  nodes.sort(cmp)

  const midObj = {}
  // 从后向前遍历
  for (let i = nodes.length - 1; i >= 0; i--) {
    const nowPid = nodes[i].pid
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
}*/

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

export class FilterChildrenFn {
  constructor(_val) {
    this.treeData = _val.treeData
    this.value = _val.value
    this.res = []
  }

  static has(_value, tmp) {
    let _has = null
    if (!('children' in tmp)) {
      _has = true
    }
    return _has
  }

  filter(_treeData, _value) {
    _treeData.forEach(_item => {
      const tmp = { ..._item }
      if (tmp.children) {
        this.filter(tmp.children, _value)
      }
      if (FilterChildrenFn.has(_value, tmp)) {
        this.res.push(tmp[_value])
      }
    })
    return this.res
  }
  getData() {
    return this.filter(this.treeData, this.value)
  }
}
// 树形数据提取数据
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
        if (this.key[0] in tmp) {
          _has = tmp[this.key[0]] === _value ? 1 : 0
        } else {
          _has = false
        }
        break
      case 2:
        if ((this.key[0] in tmp) && (this.key[1] in tmp[this.key[0]])) {
          _has = tmp[this.key[0]][this.key[1]] === _value ? 1 : 0
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

// 参数数据提取
export class ParamsToObj {
  constructor(obj, set) {
    this.obj = obj
    this.splitVal = set.splitVal
    this.typeVal = set.typeVal
  }

  setData(obj, set) {
    this.obj = obj
    this.splitVal = set.splitVal
    this.typeVal = set.typeVal
  }

  getData() {
    const _data = {}
    for (const k in this.obj) {
      const _params = k.split(this.splitVal)
      if (_params[0] === this.typeVal) {
        _data[_params[1]] = this.obj[k]
      }
    }
    return _data
  }
}

/* let _obj={
  data1:"123",
  p_data:""
};
let paramsToObj=new ParamsToObj(_obj,
  {
    splitVal:"_",
    typeVal:"p"
  });
paramsToObj.getData();*/

export function dataInitFn(_set, _data) {
  for (const _k in _set) {
    if (_k in _data) {
      _set[_k] = _data[_k]
    }
  }
  return { ..._set }
}

export function childrenInitFn(_children, _data) {
  function fn(_k, _data) {
    const _group = []
    const _M = new RegExp(_k)
    _data.children.forEach(function(_obj) {
      if (_M.test(_obj.meta.system_type)) {
        _group.push(_obj)
      }
    })
    return _group
  }
  if ('children' in _data) {
    for (const _k in _children) {
      const _ar = fn(_k, _data)
      _children[_k] = _children[_k].concat(_ar)
    }
  }
  return { ..._children }
}

/* const __kkName = { kkk: 1231, eee: 12, kk: 1231 }
const { [__kkName.key_kk ? __kkName.key_kk : 'kk']: kk } = __kkName
console.log('tt', {
  k: kk
})*/

/*
异步循环
function PromiseFN(_fn) {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1500)
  }).then(val => {
    _fn()
    PromiseFN(_fn)
  })
}
PromiseFN(function() {
  console
})*/
