import { Logger } from './logger'

export * from './logger'
export * from './spinner'
export * from './stamp'

const logger = new Logger({
  output: 'log',
  datetime: false,
})

export default logger

export * from './lib'
export * from './utils'
