// 'use client'
// import Image from 'next/image'
// import styled from 'styled-components'
// import { Button } from 'antd'
// import { post } from '@/common/utils/ajax'
import styles from './page.module.scss'

// const Styled = styled.div`
//   .something {
//     background-color: blue;
//   }
//   .ant-btn {
//     background-color: red;
//   }
// `

export async function generateStaticParams() {
  // 假设你有一个接口可以获取所有的 blog id
  return [{
    id: '123'
  }]
}

export default async function Page() {
  // const result = await post<{ username: string }>('/user/get-user-info', { username: 'maben' })
  // console.log('result:::', result)
  return (
    <div className={styles.styled}>
      {/* <p className="bg-gray-200">Page---id</p>
      <div className={styles.something}>231__{result?.data?.username}</div>
      <Button type="primary">Primary</Button>
      <Image
        src="/vercel.svg"
        alt=""
        className={styles.image}
        width={1155}
        height={1000}
        priority={true}
      /> */}
    </div>
  )
}
