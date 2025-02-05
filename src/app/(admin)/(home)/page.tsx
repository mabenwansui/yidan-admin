'use client'
import { getUserInfoApi } from './api'
import { useEffect } from 'react'

export default function Page() {
  useEffect(()=> {
    async function fetch() {
      const { flag, data } = await getUserInfoApi('maben') 
      console.log(flag, data)
    }
    fetch()
  }, [])
  return (
    <div>home\path2</div>
  )
}