'use client'
var eventSource = null
var eventSourceUrl = null

function initSSEConnection(url, ports) {
  if (eventSource && eventSourceUrl === url) {
    return
  }
  eventSourceUrl = url
  eventSource = new EventSource(url, { withCredentials: true })
  eventSource.onmessage = function (event) {
    if (ports) {
      ports.forEach((p) => p.postMessage(event.data))
    }
  }
  eventSource.onerror = function (err) {
    if (ports) {
      ports.forEach((p) => p.postMessage({ type: 'error', data: err }))
    }
  }
}
function closeSSEConnection() {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
}

onconnect = function (e) {
  const ports = e.ports
  ports.forEach(function (p) {
    p.onmessage = function (event) {
      switch (event.data.type) {
        case 'INIT_SSE':
          initSSEConnection(event.data.url, ports)
          break
        case 'CLOSE_SSE':
          closeSSEConnection()
      }
    }
  })
}

// 通过 chrome://inspect/#workers 进行调试
// let eventSource = null
// onconnect = function (e) {
//   const ports = e.ports
//   // 初始化 SSE 连接（只建一次）
//   if (!eventSource) {
//     eventSource = new EventSource('https://localhost:4000/api/message/sse')
//     eventSource.onmessage = (event) => {
//       ports.forEach((p) => p.postMessage(event.data))
//     }
//     eventSource.onerror = (err) => {
//       ports.forEach((p) => p.postMessage({ type: 'error', data: err }))
//     }
//   }
//   // 接收来自页面的消息
//   ports[0].onmessage = (event) => {
//     console.log('[SharedWorker] from tab:', event.data)
//     // 可实现：订阅频道、关闭连接等
//   }
// }
