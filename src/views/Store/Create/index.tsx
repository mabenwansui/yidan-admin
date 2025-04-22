'use client'
import Form from '../ui/Form'
import useCreate, { Props as CreateProps } from './hooks/useCreate'

export default function Create() {
  const handleFinish = (values: CreateProps) => {
    console.log('val', values)
  }
  return (
    <section className="max-w-xl pt-2">
      <Form onFinish={handleFinish} />
    </section>
  )
}
