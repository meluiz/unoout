const isWinWithoutWTSession = process.platform === 'win32' && !process.env.WT_SESSION

// Icons for the specific Windows condition (without WT_SESSION)
const winWithoutWTSessionIcons = {
  tick: '√',
  cross: '×',
  bullet: '*',
  nodejs: '♦',
  info: 'i',
  warning: '‼',
} as const

// Icons for non-Windows platforms or Windows with WT_SESSION
const otherPlatformIcons = {
  tick: '✔',
  cross: '✖',
  circle: '●',
  nodejs: '⬢',
  info: 'ℹ',
  warning: '⚠',
} as const

// Export the appropriate icons based on the platform
export const icons = isWinWithoutWTSession ? winWithoutWTSessionIcons : otherPlatformIcons

// Represents different types of boxes.
export const boxes = {
  single: {
    topLeft: '┌',
    top: '─',
    topRight: '┐',
    right: '│',
    bottomRight: '┘',
    bottom: '─',
    bottomLeft: '└',
    left: '│',
  },
  double: {
    topLeft: '╔',
    top: '═',
    topRight: '╗',
    right: '║',
    bottomRight: '╝',
    bottom: '═',
    bottomLeft: '╚',
    left: '║',
  },
  round: {
    topLeft: '╭',
    top: '─',
    topRight: '╮',
    right: '│',
    bottomRight: '╯',
    bottom: '─',
    bottomLeft: '╰',
    left: '│',
  },
  bold: {
    topLeft: '┏',
    top: '━',
    topRight: '┓',
    right: '┃',
    bottomRight: '┛',
    bottom: '━',
    bottomLeft: '┗',
    left: '┃',
  },
  classic: {
    topLeft: '+',
    top: '-',
    topRight: '+',
    right: '|',
    bottomRight: '+',
    bottom: '-',
    bottomLeft: '+',
    left: '|',
  },
} as const
