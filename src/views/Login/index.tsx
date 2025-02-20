import '@ant-design/v5-patch-for-react-19'
import { Suspense } from 'react'
import LoginForm from './ui/LoginForm'
import Loading from '@/components/Loading'

export default function Login() {
  return (
    <div className="w-screen h-screen bg-red-400">
      <div className="max-w-screen-lg h-screen mx-auto flex items-center justify-end">
        <div className="basis-5/12">
          <Suspense fallback={<Loading />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
