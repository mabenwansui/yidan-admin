import RegisterForm from './ui/RegisterForm'

export default function Register() {
  return (
    <div className="register-page w-screen h-screen bg-red-400">
      <div className="max-w-screen-lg h-screen mx-auto flex items-center justify-end">
        <div className="basis-5/12">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
