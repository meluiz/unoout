import { Formatter } from 'picocolors/types'
import { colors } from '../utils'

/**
 * Enumeration of log levels.
 */
export enum LogLevel {
  log = 0,
  info = 10,
  debug = 20,
  wait = 30,
  event = 40,
  ready = 50,
  warn = 60,
  off = 70,
  error = 80,
  fatal = 90,
}

/**
 * Type representing the names of log levels.
 */
export type LogLevelName = keyof typeof LogLevel

/**
 * Array of level names derived from the LogLevel enumeration.
 */
export const levelNames = Object.keys(LogLevel).filter((key) => !isNaN(Number(key)))

/**
 * Mapping of level values to their corresponding names.
 */
export const levelByName: Record<string, LogLevelName> = {
  [String(LogLevel.log)]: 'log',
  [String(LogLevel.info)]: 'info',
  [String(LogLevel.debug)]: 'debug',
  [String(LogLevel.wait)]: 'wait',
  [String(LogLevel.event)]: 'event',
  [String(LogLevel.ready)]: 'ready',
  [String(LogLevel.warn)]: 'warn',
  [String(LogLevel.off)]: 'off',
  [String(LogLevel.error)]: 'error',
  [String(LogLevel.fatal)]: 'fatal',
}

/**
 * Retrieves the LogLevel value associated with the provided levelName.
 *
 * @param levelName - The name of the log level.
 * @returns The LogLevel value.
 * @throws Error if the provided levelName is unknown.
 */
export function getLevelByName(levelName: LogLevelName): LogLevel {
  const level = LogLevel[levelName]

  if (!level) {
    throw new Error(`Unrecognized log level: ${level}. Verify input value.`)
  }

  return level
}

/**
 * Retrieves the name of the log level associated with the provided level.
 *
 * @param level - The log level.
 * @returns The name of the log level.
 * @throws Error if the provided level is unknown.
 */
export function getLevelName(level: number): LogLevelName {
  const levelName = levelByName[level]

  if (!levelName) {
    throw new Error(`Unrecognized log level: ${level}. Verify input value.`)
  }

  return levelName
}

/**
 * Colorizes the level of a log message.
 *
 * @param {LogLevel} level - The level of the log message.
 * @param {keyof typeof colors} color - The color to use for the level.
 * @return {string} - The colorized log message level.
 */
export function colorizeLevel(level: LogLevel, color: keyof typeof colors) {
  const painter = colors[color] as Formatter
  const levelName = getLevelName(level)
  const levelColor = painter(levelName).padEnd(15, ' ')

  return `${levelColor} -`
}
