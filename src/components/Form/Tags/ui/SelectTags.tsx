import { useState } from 'react'
import { Tag } from 'antd'
import Add from './AddBtn'

const tagsData = ['Movies', 'Books', 'Music', 'Sports']

const App: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Movies'])
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag)
    console.log('You are interested in: ', nextSelectedTags)
    setSelectedTags(nextSelectedTags)
  }
  const handleAddFinish = () => {}
  return (
    <div>
      <div>
        {tagsData.map<React.ReactNode>((tag) => (
          <Tag.CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </Tag.CheckableTag>
        ))}
      </div>
      <Add onFinish={handleAddFinish} />
    </div>
  )
}

export default App
