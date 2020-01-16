/**
 * Created by PanJiaChen on 16/11/18.
 * 表单验证规则
 */

/**
 判断为手机号码
 */
export function isPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('不能为空'))
  }
  setTimeout(() => {
    if (/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入有效的手机号'))
    }
  }, 100)
}
/**
 正整数
 */
export function integerP(rule, value, callback) {
  if (value && !(/^[1-9]\d*$/).test(value)) {
    callback(new Error('只能填写正整数'))
  } else {
    callback()
  }
}
/**
 年龄1-120
 */
export function integerAge(rule, value, callback) {
  if (value && !(/^(?:[1-9][0-9]?|1[01][0-9]|120)$/).test(value)) {
    callback(new Error('只能填写1-120的正整数'))
  } else {
    callback()
  }
}
/**
 整数
 */
export function integerN(rule, value, callback) {
  if (value && !(/^[0-9]\d*$/).test(value)) {
    callback(new Error('只能填写0-9的整数'))
  } else {
    callback()
  }
}
/**
 身份证号验证
 */
export function idCard(rule, value, callback) {
  if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
    callback(new Error('身份证号码不符合规范'))
  } else {
    callback()
  }
}
/**
 英文字符
 */
export function enText(rule, value, callback) {
  if (value && !(/^[A-Za-z]+$/).test(value)) {
    callback(new Error('只能填写英文字符'))
  } else {
    callback()
  }
}

/**
 数字和英文字符
 */
export function ChEnText(rule, value, callback) {
  if (value && !(/^[A-Za-z0-9]+$/).test(value)) {
    callback(new Error('只能填写数字和英文字符'))
  } else {
    callback()
  }
}
/**
 大小写英文字符、下划线和中划线
 */
export function EnTextCode(rule, value, callback) {
  if (value && !(/^[A-Za-z0-9_\-]+$/ig).test(value)) {
    callback(new Error('只能填写数字、英文字符、中划线和下划线'))
  } else {
    callback()
  }
}
/**
 中文字符
 */
export function cnText(rule, value, callback) {
  // let a = '',
  //   arr = value.split(" ")
  // for (let i = 0; i < arr.length; i++) { //删除行内空格
  //   a += arr[i];
  // }
  if (value && (/[^\u4e00-\u9fa5]/).test(value)) {
    callback(new Error('只能填写中文字符'))
  } else {
    callback()
  }
}

/**
 正整数
 */
export function validateNum(rule, value, callback) {
  if (!/^[1-9]$/.test(value)) {
    callback(new Error('请输入正整数！'))
  } else {
    callback()
  }
}
/**
 正数(可输入小数点)
 */
export function validateDecimal(rule, value, callback) {
  if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
    callback(new Error('请输入正数(可输入小数点)！'))
  } else {
    callback()
  }
}
/**
 经度
 */
export function checkLongitude(rule, value, callback) {
  const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  if (!longrg.test(value)) {
    callback(new Error('经度整数部分为0-180,小数部分为0到6位!'))
  } else {
    callback()
  }
}

/**
 纬度
 */
export function checkLatitude(rule, value, callback) {
  var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  if (!latreg.test(value)) {
    callback(new Error('纬度整数部分为0-90,小数部分为0到6位!'))
  } else {
    callback()
  }
}
/**
 中英文、数字、和下划线
 */
export function checkString(rule, value, callback) {
  var latreg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
  if (!latreg.test(value)) {
    callback(new Error('中英文、数字和下划线'))
  } else {
    callback()
  }
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const validate = {
  isPhone, idCard, integerP, EnTextCode, cnText, integerN, checkLongitude, checkLatitude, checkString, validateNum, validateDecimal, integerAge
}
