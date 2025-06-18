import { User } from '@/common/types/user'

export const SenderType = {
  SYSTEM: 'system',
  USER: 'user'
} as const
export type SenderType = ValueOf<typeof SenderType>

export const MessageType = {
  ORDER: 'order'
} as const
export type MessageType = ValueOf<typeof MessageType>

export interface Content_Order {
  orderId: string
}

export interface Message {
  id: string
  messageType: MessageType
  title: string
  content?: Content_Order | string
  isRead: boolean
  sender?: User
  senderType: SenderType
  readAt: Date
  sendTime: Date
}
