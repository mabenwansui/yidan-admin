import config from '@/config'
const domain = config.apiDomain

let worker: SharedWorker | null = null
export default function sse() {
  if (worker) return worker
  worker = new SharedWorker('/sse.worker.js')
  worker.port.postMessage({ type: 'INIT_SSE', url: `${domain}/api/message/sse` })
  worker.port.start()
  return worker
}
