// 下载Excel - 根据文件流
export const downloadExcel = (url, fileName, fileType = 'xls') => {
  var blob = new Blob([url], { type: url.type })
  var downloadElement = document.createElement('a')
  var href = window.URL.createObjectURL(blob) // 创建下载的链接
  var fileSuffix = `.${fileType}` // 文件的后缀，默认是Excel的xls
  downloadElement.href = href
  downloadElement.download = typeof fileName !== 'undefined' ? fileName + fileSuffix : new Date().getTime() + fileSuffix // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}
