import { stdout } from './stdout'

/**
 * Represents the base structure of a log entry.
 */
interface LogEntryBase {
  message: string // The log message.
  level?: string // The log level (optional).
  datatime?: boolean // Whether to include the timestamp in the log entry (optional).
}

/**
 * Represents a log entry that only contains the log message.
 */
interface isReturnOnly extends LogEntryBase {
  output?: undefined // No output is expected.
  returnOnly: true // Only the log message is returned.
}

/**
 * Represents a log entry that includes both the log message and an output destination.
 */
interface isNotReturnOnly extends LogEntryBase {
  output: 'log' | 'stdout' // The destination for the log output.
  returnOnly?: false | undefined // The log message and output are returned.
}

/**
 * Represents a log entry.
 */
type LogEntry = isReturnOnly | isNotReturnOnly

/**
 * Logs a message with optional level and output.
 *
 * @param options - The log entry options.
 * @returns The formatted log message if returnOnly is true, otherwise void.
 */
export function logEntry(options: isReturnOnly): string

/**
 * Logs a message with optional level and output.
 *
 * @param options - The log entry options.
 * @returns void.
 */
export function logEntry(options: isNotReturnOnly): void

/**
 * Logs a message with optional level and output.
 *
 * @param options - The log entry options.
 * @returns The formatted log message if returnOnly is true, otherwise void.
 */
export function logEntry(options: LogEntry): string | void {
  const { message, level, output = 'stdout', datatime = false, returnOnly = false } = options

  const logMessage = []
  const logFunction = output === 'log' ? console.log : stdout

  if (datatime) {
    logMessage.push(new Date().toISOString())
  }

  if (level) {
    logMessage.push(level)
  }

  logMessage.push(message)

  const formated = logMessage.join(' ')

  if (returnOnly) {
    return formated
  }

  logFunction(formated)
}
