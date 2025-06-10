import { useCreateTag, useDeleteTag, useSortTag } from './hooks/useRemarkTagUpsert'
import useRemarkTagList from './hooks/useRemarkTagList'
import extend from 'just-extend'

import Tags from './ui/Tags'

export default function ReMarkTags() {
  const { trigger: create } = useCreateTag()
  const { trigger: del } = useDeleteTag()
  const { trigger: sort } = useSortTag()
  const { data, isLoading, mutate } = useRemarkTagList()

  const list = data?.data.list || []

  const handleCreate = async (val: string) => {
    const { flag } = await create({ name: val })
    if (flag === 1) {
      mutate()
    }
  }
  const handleDelete = async (id: string) => {
    const { flag } = await del({ id })
    if (flag === 1) {
      mutate()
    }
  }
  const handleSort = async (newList: any, activeId: string, overId: string) => {
    mutate(
      (data) => {
        return extend({}, data!, { data: { list: newList } }) as any
      },
      { revalidate: false }
    )
    const activeItem = list.find((item) => item.id === activeId)
    const overItem = list.find((item) => item.id === overId)
    const { flag } = await sort({
      active: {
        id: activeItem!.id!,
        sort: activeItem!.sort!
      },
      over: {
        id: overItem!.id!,
        sort: overItem!.sort!
      }
    })
    if (flag === 1) {
      mutate()
    }
  }
  return (
    <>
      {isLoading === false && <Tags list={list} onSort={handleSort} onDelete={handleDelete} onCreate={handleCreate} />}
    </>
  )
}
