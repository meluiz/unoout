import { Logger } from './logger'

export * from './logger'

const logger = new Logger({
  output: 'log',
  datatime: false,
})

export default logger

export * from './lib'
export * from './utils'
