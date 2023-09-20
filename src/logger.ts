import { LogLevel, colorizeLevel, logEntry } from './lib'
import { colors } from './utils'

interface LoggerOptions {
  output?: 'log' | 'stdout'
  datetime?: boolean
}

export class Logger {
  private output: 'log' | 'stdout'
  private datetime: boolean

  constructor(options?: LoggerOptions) {
    const { output = 'log', datetime = false } = options || {}

    this.output = output
    this.datetime = datetime
  }

  /**
   * Adds a prefix to a given message.
   *
   * @param {string} message - The message to add a prefix to.
   * @param {string} prefix - The prefix to add to the message. Optional.
   * @return {string} - The message with the prefix added.
   */
  private addPrefix(message: string, prefix?: string) {
    if (!prefix) {
      return message
    }

    prefix = colors.gray(`(${prefix})`)

    return `${prefix} ${message}`
  }

  /**
   * Adds a suffix to a given message.
   *
   * @param {string} message - The message to add the suffix to.
   * @param {string} [sufix] - The suffix to add to the message. (optional)
   * @returns {string} - The message with the suffix added.
   */
  private addSufix(message: string, sufix?: string) {
    if (!sufix) {
      return message
    }

    sufix = colors.gray(`(${sufix})`)

    return `${message} ${sufix}`
  }

  /**
   * Logs a message with an optional prefix and suffix.
   *
   * @param {string} message - The message to be logged.
   * @param {string} [prefix] - Optional prefix to be added to the message.
   * @param {string} [sufix] - Optional suffix to be added to the message.
   */
  public log(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    logEntry({
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Logs an informational message with optional prefix and suffix.
   *
   * @param {string} message - The message to be logged.
   * @param {string} [prefix] - Optional prefix to be added to the message.
   * @param {string} [suffix] - Optional suffix to be added to the message.
   */
  public info(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.info, 'blue')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Debugs a message with an optional prefix and suffix.
   *
   * @param {string} message - The message to be debugged.
   * @param {string} [prefix] - An optional prefix to be added to the message.
   * @param {string} [sufix] - An optional suffix to be added to the message.
   */
  public debug(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.debug, 'cyan')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Performs a wait operation and logs a message with an optional prefix and suffix.
   *
   * @param {string} message - The message to be logged.
   * @param {string} [prefix] - An optional prefix to be added to the message.
   * @param {string} [suffix] - An optional suffix to be added to the message.
   */
  public wait(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.wait, 'magenta')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Logs an event message with an optional prefix and suffix.
   *
   * @param {string} message - The message to log.
   * @param {string} [prefix] - An optional prefix to add to the message.
   * @param {string} [sufix] - An optional suffix to add to the message.
   */
  public event(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.event, 'green')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Sets up the message with optional prefix and suffix, colors the message white, and logs the message to the console with the appropriate log level.
   *
   * @param {string} message - The message to be logged.
   * @param {string} [prefix] - An optional prefix to be added to the message.
   * @param {string} [sufix] - An optional suffix to be added to the message.
   * @return {void} This function does not return a value.
   */
  public ready(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.ready, 'green')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Logs a warning message with an optional prefix and suffix.
   *
   * @param {string} message - The message to log.
   * @param {string} [prefix] - An optional prefix to add to the message.
   * @param {string} [sufix] - An optional suffix to add to the message.
   */
  public warn(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.warn, 'yellow')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * A description of the entire function.
   *
   * @param {string} message - The message to be processed.
   * @param {string} prefix - The optional prefix to be added to the message.
   * @param {string} sufix - The optional sufix to be added to the message.
   */
  public off(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.off, 'gray')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Logs an error message with an optional prefix and suffix.
   *
   * @param {string} message - The error message to log.
   * @param {string} [prefix] - An optional prefix to add to the error message.
   * @param {string} [suffix] - An optional suffix to add to the error message.
   */
  public error(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.error, 'red')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: this.datetime,
    })
  }

  /**
   * Logs a fatal error message with optional prefix and suffix.
   *
   * @param {string} message - The error message to log.
   * @param {string} [prefix] - An optional prefix to prepend to the message.
   * @param {string} [suffix] - An optional suffix to append to the message.
   */
  public fatal(message: string, prefix?: string, sufix?: string) {
    message = colors.white(message)
    message = this.addPrefix(message, prefix)
    message = this.addSufix(message, sufix)

    const level = colorizeLevel(LogLevel.fatal, 'red')

    logEntry({
      level,
      message,
      output: this.output,
      datetime: true,
    })
  }
}
