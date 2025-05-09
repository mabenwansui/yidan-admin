import config from '@/config'
const domain = config.apiDomain

let worker: SharedWorker | null = null
export default function sse() {
  if (worker) return worker
  worker = new SharedWorker('/sse.worker.js')
  worker.port.postMessage({ type: 'INIT_SSE', url: `${domain}/api/message/sse` })
  // worker.port.addEventListener('message', (event) => {
  //   const data = event.data
  //   console.log('[Tab] Received SSE222333:', data)
  //   // 更新 UI、缓存等
  // })
  worker.port.start()
  return worker
}
