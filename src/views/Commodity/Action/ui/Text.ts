import logger from '@/common/utils/logger'
import { memo } from 'react'

export default memo(function Text() {
  logger.info('text runder')
  return null
})
