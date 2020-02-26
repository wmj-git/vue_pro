import { MessageBox } from 'element-ui'
// import router from './router'
// import store from '@/store'

// 树型数据排序
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

function treeStructure(data, set) {
  console.log('treeStructure', set)
  const _set = {
    id: 'id',
    pid: 'pid'
  }
  if (set) {
    Object.assign(_set, set)
  }
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children
  })

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {}
  data.forEach(function(item) {
    map[item[_set.id]] = item
  })
  //        console.log(map);
  const val = []
  data.forEach(function(item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map[item[_set.pid]]
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
    if (_item[_set.pid] in _val) {
      _val[_item[_set.pid]].push(_item)
    } else {
      _val[_item[_set.pid]] = []
      _val[_item[_set.pid]].push(_item)
    }
  })
  return _val
  // return val
}

export function toTree(_nodes, _set) {
  const _Tree = []
  const _data = treeStructure(_nodes, _set)
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
// 树形数过滤数据
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

// 异步循环
export function promiseFn(_time, _judgeFn, _fn) {
  new Promise((resolve) => {
    setTimeout(() => {
      if (_judgeFn()) {
        resolve(true)
      } else {
        resolve(false)
      }
    }, _time)
  }).then(val => {
    if (val) {
      _fn()
    } else {
      MessageBox.confirm('数据异常, 是否重复操作?', '提示', {
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        promiseFn(_fn, _judgeFn)
      })
    }
  })
}

// 动态加载js文件
export function loadJs(id, url, callback) {
  var script = document.createElement('script')
  script.id = id
  script.type = 'text/javascript'
  if (typeof (callback) !== 'undefined') {
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = function() {
        callback()
      }
    }
  }
  script.src = url
  // document.head.appendChild(script);
  const _element = document.getElementById('em')
  _element.parentNode.insertBefore(script, _element.nextSibling)// 将script插入到_element外部后面
}

/* loadJs("test.js",function(){
  alert('done');
});*/

// 动态加载css文件
export function loadCss(id, url, callback) {
  const link = document.createElement('link')
  link.id = id
  link.type = 'text/css'
  link.rel = 'stylesheet'
  if (typeof (callback) !== 'undefined') {
    if (link.readyState) {
      link.onreadystatechange = function() {
        if (link.readyState === 'loaded' || link.readyState === 'complete') {
          link.onreadystatechange = null
          callback()
        }
      }
    } else {
      link.onload = function() {
        callback()
      }
    }
  }
  link.href = url
  // document.head.appendChild(link);
  const _element = document.getElementById('em')
  _element.parentNode.insertBefore(link, _element.nextSibling)// 将link插入到_element外部后面
}

/* loadCss("test.css",function(){
  alert('done');
});*/

// 算周数
export function getYearWeek(date) {
  date.getTime()
  var day1 = date.getDay()
  if (day1 === 0) day1 = 7

  const d = Math.round((date.getTime() + day1 * (24 * 60 * 60 * 1000)) / 86400000)
  return Math.ceil(d / 7) + 1
}
// 算周数end

// 获取当前或者前那一天时间
/*
 ps：
 getNowFormatDate();//当天时间
 getNowFormatDate(-2);//前两天时间
 getNowFormatDate(2);//后两天时间
 */
export function getNowFormatDate(num) {
  var date = new Date()
  if (num != null) {
    date = new Date(date.getTime() + 24 * 60 * 60 * 1000 * (num))
  }
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds() + ':'
  var i = date.getMilliseconds()

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentDate = year + seperator1 + month + seperator1 + strDate + h + m + s + i
  return {
    timestamp: date.getTime(),
    time: currentDate
  }
}

export function timestampToTime(timestamp) {
  // var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + h + m + s
}

// timestampToTime(1403058804);
// console.log(timestampToTime(1403058804));//2014-06-18 10:33:24
// 获取时间end
