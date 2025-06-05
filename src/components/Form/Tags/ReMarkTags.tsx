import { useCreateTag, useDeleteTag } from './hooks/useRemarkTagUpsert'
import useRemarkTagList from './hooks/useRemarkTagList'

import Tags from './ui/Tags'

export default function ReMarkTags() {
  const { trigger: create } = useCreateTag()
  const { trigger: del } = useDeleteTag()
  const { list, refresh, isLoading } = useRemarkTagList()
  const handleCreate = async (val: string) => {
    const { flag } = await create({ name: val })
    if (flag) {
      refresh()
    }
  }
  const handleDelete = async (id: string) => {
    const { flag } = await del({ id })
    if (flag) {
      refresh()
    }
  }
  return <>{isLoading === false && <Tags list={list} onDelete={handleDelete} onCreate={handleCreate} />}</>
}
