import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

var websock = null
var saveObj = {}
var websocketurl = null
var stompClient = null
// 初始化weosocket
function initWebSocket(url = websocketurl) {
  // ws地址 -->这里是你的请求路径
  websocketurl = url
  console.log(websocketurl)
  // 建立连接对象（还未发起连接）
  var socket = new SockJS(websocketurl)
  /* var socket = new SockJS(process.env.VUE_APP_BASE_API + '/Authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNSU5HIiwiZXhwIjoxNTc4NDUyNzY4LCJpYXQiOjE1Nzg0NTA5NjgsInVzZXIiOiJ7XCJwaG9uZVwiOjE4OTQ0NDQ0NDQ0LFwib3JnSWRcIjo1MDAxMDcwMDIsXCJvcmdUeXBlXCI6NSxcInJvbGVJZFwiOjQzNH0ifQ.XnStuxg3ZT8mkfORanCU_79SO4xfcG9DYrR9VdWQ7rM')
  */
  // 获取 STOMP 子协议的客户端对象
  stompClient = Stomp.over(socket)
  // 向服务器发起websocket连接并发送CONNECT帧
  stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame)
    // 订阅频道
    stompClient.subscribe('/topic/getResponse', function(response) {
      console.log('response_body', response)
      websocketonmessage(response)
    })
    stompClient.subscribe('/user/topic/channelMessage', function(response) {
      console.log('channelMessage', response)
      websocketonmessage(response)
    })
  })
  socket.onclose = websocketclose
}

// 实际调用的方法
function sendSock(agentData, callback) {
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback)
    }, 1000)
  }
}

// 数据接收
function websocketonmessage(e) {
  const data = e.body
  console.log(e)
  if (data.indexOf('{') !== -1 && data.indexOf('}') !== -1) { // 是JSON字符串
    const obj = JSON.parse(data)
    if (saveObj[obj.type]) {
      saveObj[obj.type](obj)
    }
  }
}

function proxyFunction(type, callback) {
  saveObj[type] = callback
}

// 数据发送
function websocketsend(agentData) {
  websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose(e) {
  console.log('connection closed (' + e.code + ')')
  initWebSocket()
}

// 创建 websocket 连接
function websocketOpen(e) {
  console.log('连接成功')
}

export {
  initWebSocket,
  proxyFunction
}

