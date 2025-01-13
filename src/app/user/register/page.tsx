import '@ant-design/v5-patch-for-react-19'
import Register from './ui/Register'

export default function Page() {
  return (
    <div className="register-page w-screen h-screen bg-red-400">
      <div className="max-w-screen-lg h-screen mx-auto flex items-center justify-end">
        <div className="basis-5/12">
          <Register />
        </div>
      </div>
    </div>
  )
}
