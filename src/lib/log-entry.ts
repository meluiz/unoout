import { stdout } from './stdout'

// Define the shape of a log entry
interface LogEntry {
  message: string
  level?: string
  output: 'log' | 'stdout'
  datatime?: boolean
}

/**
 * Log an entry with the given options.
 * @param options - The options for the log entry.
 */
export function logEntry(options: LogEntry) {
  // Destructure the options object
  const { message, level, output = 'stdout', datatime = false } = options

  // Determine the log function based on the output option
  const logFunction = output === 'log' ? console.log : stdout

  // Create an array to hold the log message components
  const logMessage = []

  // Add the current datetime to the log message if datatime is true
  if (datatime) {
    logMessage.push(new Date().toISOString())
  }

  // Add the log level to the log message if provided
  if (level) {
    logMessage.push(level)
  }

  // Add the log message itself
  logMessage.push(message)

  // Join the log message components into a single string
  const formated = logMessage.join(' ')

  // Call the appropriate log function with the formatted message
  logFunction(formated)
}
