import { useState } from 'react'
import { Button } from 'antd'
import Edit from './Edit'

interface Props {
  btnText?: string
  onCreated?: (categoryName: string) => void
}

export default function CreateButton(props: Props) {
  const [isEdit, setIsEdit] = useState(false)
  const { btnText, onCreated } = props
  const handleEditClick = () => {
    setIsEdit(true)
  }
  const handleCreated = (categoryName: string) => {
    onCreated?.(categoryName)
    setIsEdit(false)
  }
  return (
    <div className="ml-8 mt-2">
      {!isEdit ? (
        <Button type="primary" onClick={handleEditClick}>
          {btnText || '创建分类'}
        </Button>
      ) : (
        <Edit onOk={handleCreated} onCancel={() => setIsEdit(false)} />
      )}
    </div>
  )
}
