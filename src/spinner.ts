import logUpdate from 'log-update'
import { LogLevel, getColoredLevel, logEntry } from './lib'
import { colors } from './utils'

interface SpinnerLoggerOptions {
  level?: LogLevel
  prefix?: string
  sufix?: string
}

interface SpinnerOptions {
  frames?: string[]
  interval?: number
  defaultLogger?: SpinnerLoggerOptions
}

export class Spinner {
  private frames: string[]
  private interval: number

  private state: 'idle' | 'running' | 'stopped' = 'idle'
  private currentIndex = 0

  private message: string = ''

  private storage: SpinnerLoggerOptions
  private defaultLogger: SpinnerLoggerOptions

  /**
   * Creates a new instance of the Spinner class.
   * @param options - The options for the spinner.
   */
  constructor(options?: SpinnerOptions) {
    const { frames = ['.  ', '.. ', '...', ' ..', '  .', '   '], interval = 250, defaultLogger = {} } = options || {}

    this.frames = frames
    this.interval = interval

    this.storage = {
      level: LogLevel.wait,
      ...defaultLogger,
    }

    this.defaultLogger = {
      level: LogLevel.wait,
      ...defaultLogger,
    }
  }

  /**
   * Returns an object containing functions for manipulating the current index of the spinner.
   *
   * @return {object} An object with the following functions:
   *   - `reset`: A function that sets the current index to 0.
   *   - `increment`: A function that increments the current index, wrapping around to 0 if necessary.
   *   - `decrement`: A function that decrements the current index, wrapping around to the last index if necessary.
   */
  private get index() {
    function increment(this: Spinner) {
      this.currentIndex = this.frames.length === this.currentIndex + 1 ? 0 : this.currentIndex + 1
    }

    function decrement(this: Spinner) {
      this.currentIndex = this.currentIndex - 1 < 0 ? this.frames.length - 1 : this.currentIndex - 1
    }

    function reset(this: Spinner) {
      this.currentIndex = 0
    }

    return {
      reset: reset.bind(this),
      increment: increment.bind(this),
      decrement: decrement.bind(this),
    }
  }

  /**
   * Spins the function.
   *
   * @param {boolean} removeFrame - whether to remove frame or not (default: false)
   * @return {void}
   */
  public spin(removeFrame: boolean = false) {
    if (this.state !== 'running') {
      return
    }

    const frame = !removeFrame ? this.frames[this.currentIndex] : ''
    const logMessage = []

    if (this.storage.level) {
      const coloredLevel = getColoredLevel(this.storage.level)
      logMessage.push(coloredLevel)
    }

    if (this.storage.prefix) {
      const coloredPrefix = colors.dim(`(${this.storage.prefix})`)
      logMessage.push(coloredPrefix)
    }

    logMessage.push(this.message)

    if (this.storage.sufix) {
      const coloredSufix = colors.dim(`(${this.storage.sufix})`)
      logMessage.push(coloredSufix)
    }

    const message = logMessage.join(' ')

    const log = logEntry({
      message: `${message}${frame}`,
      returnOnly: true,
    })

    logUpdate(log)

    setTimeout(() => {
      this.index.increment()
      this.spin()
    }, this.interval)
  }

  /**
   * Starts the function execution with the given message, prefix, and suffix.
   *
   * @param {string} message - The message to be used in the function execution.
   * @param {string} prefix - The prefix to be used in the function execution. Optional, defaults to the defaultLogger prefix.
   * @param {string} suffix - The suffix to be used in the function execution. Optional, defaults to the defaultLogger suffix.
   * @return {void} Returns nothing.
   */
  public start(message: string, prefix?: string, sufix?: string) {
    this.state = 'running'

    this.message = message
    this.storage.sufix = sufix || this.defaultLogger.sufix
    this.storage.prefix = prefix || this.defaultLogger.prefix

    this.spin()

    return this
  }

  /**
   * Stops the operation of the function.
   *
   * @param {void} - No parameters required.
   * @return {void} - No return value.
   */
  public stop() {
    this.spin(true)

    this.state = 'stopped'
    this.index.reset()

    logUpdate.done()
  }

  /**
   * Updates the spinner message, spinner options, and forces the spinner to spin if specified.
   *
   * @param {string} message - The new message to display on the spinner. If not provided, the current message will not be updated.
   * @param {boolean} forceSpin - Whether to force the spinner to spin. If set to true, the spinner will start spinning regardless of its current state. If set to false or not provided, the spinner will only start spinning if it is not already spinning.
   * @param {SpinnerLoggerOptions} options - The options for the spinner. If not provided, the spinner options will not be updated.
   * @return {this} The updated spinner instance.
   */
  public update(message?: string, forceSpin?: boolean, options?: SpinnerLoggerOptions) {
    const { level, prefix, sufix } = options || {}

    this.message = message || this.message

    this.storage.level = level || this.defaultLogger.level
    this.storage.sufix = sufix || this.defaultLogger.sufix
    this.storage.prefix = prefix || this.defaultLogger.prefix

    if (forceSpin) {
      this.spin()
    }

    return this
  }
}
