import colors from 'picocolors'
import { boxes } from '.'

export type BoxKeys = keyof typeof boxes
export type LineOptions = {
  paddingLeft: number
  paddingRight: number
}

export class Line {
  private line: (typeof boxes)[BoxKeys]
  private options: LineOptions = {
    paddingLeft: 4,
    paddingRight: 4,
  }

  /**
   * Creates a new Line object.
   * @param boxType - The type of box.
   * @param length - The length of the line.
   */
  constructor(
    private boxType: BoxKeys = 'round',
    private length = 56
  ) {
    this.line = boxes[this.boxType]
  }

  /**
   * Retrieves ANSI escape sequences from a text.
   * @param text - The input text.
   * @returns An array of ANSI escape sequences.
   */
  private getANSI(text: string) {
    const regex = /\x1b\[[0-9;]*[mGKH]/g
    const match: string[] | null = text.match(regex)
    return match || []
  }

  /**
   * Wraps a text into multiple lines based on the given size.
   * @param text - The input text to wrap.
   * @param size - The maximum line size.
   * @returns An array of wrapped lines.
   */
  private wrapText(text: string, size: number) {
    if (!text.trim().length) {
      return [' ']
    }

    const words = text.split(' ')
    const wrappedLines = []
    let currentLine = ''

    for (const word of words) {
      if ((currentLine + ' ' + word).length <= size) {
        if (currentLine) {
          currentLine += ' '
        }
        currentLine += word
      } else {
        wrappedLines.push(currentLine)
        currentLine = word
      }
    }

    if (currentLine) {
      wrappedLines.push(currentLine)
    }

    return wrappedLines
  }

  /**
   * Repeats a text a specified number of times.
   * @param text - The text to repeat.
   * @param times - The number of times to repeat.
   * @returns The repeated text.
   */
  public repeatText(text: string, times: number) {
    return new Array(times + 1).join(text)
  }

  /**
   * Retrieves the top line of the line box.
   * @returns The top line.
   */
  public getTopLine(): string {
    const width = this.length

    const topLine = colors.dim(this.line.top)
    const topLeftLine = colors.dim(this.line.topLeft)
    const topRightLine = colors.dim(this.line.topRight)

    const horizontalLine = this.repeatText(topLine, width - 2)

    return `${topLeftLine}${horizontalLine}${topRightLine}`
  }

  /**
   * Retrieves the bottom line of the line box.
   * @returns The bottom line.
   */
  public getBottomLine(): string {
    const width = this.length

    const bottomLine = colors.dim(this.line.bottom)
    const bottomLeftLine = colors.dim(this.line.bottomLeft)
    const bottomRightLine = colors.dim(this.line.bottomRight)

    const horizontalLine = this.repeatText(bottomLine, width - 2)

    return `${bottomLeftLine}${horizontalLine}${bottomRightLine}`
  }

  /**
   * Retrieves the horizontal line of the line box.
   * @returns The horizontal line.
   */
  public getHorizontalLine(): string {
    const width = this.length

    const bottomLine = colors.dim(this.line.bottom)
    const leftLine = colors.dim(this.line.left)
    const rightLine = colors.dim(this.line.right)

    const horizontalLine = this.repeatText(bottomLine, width - 2)

    return `${leftLine}${horizontalLine}${rightLine}`
  }

  /**
   * Returns the gutter line for the current line.
   *
   * @return {string} The gutter line.
   */
  public getGutterLine(): string {
    const width = this.length

    const leftLine = colors.dim(this.line.left)
    const rightLine = colors.dim(this.line.right)

    const gutterLine = this.repeatText(' ', width - 2)

    return `${leftLine}${gutterLine}${rightLine}`
  }
  /**
   * Returns the formatted content line for the given text.
   * @param {string} text - The input text.
   * @param {boolean} hasArrowPrefix - Whether the line has an arrow prefix.
   * @returns {string} The formatted content line.
   */
  public getContentLine(text: string, hasArrowPrefix = false) {
    const width = this.length
    const paddings = this.options.paddingLeft + this.options.paddingRight

    const arrowPrefixLen = hasArrowPrefix ? 2 : 0
    const maxLength = width - paddings - 2 - arrowPrefixLen

    const paddingLeft = this.repeatText(' ', this.options.paddingLeft)
    const paddingRight = this.repeatText(' ', this.options.paddingRight)

    const leftLine = colors.dim(this.line.left)
    const rightLine = colors.dim(this.line.right)

    const chunks = this.wrapText(text, maxLength)

    const formattedChunks = chunks.map((chunk, idx) => {
      const leftSide = leftLine + paddingLeft
      const rightSide = paddingRight + rightLine

      const ansiLen = this.getANSI(chunk).reduce((acc, cur) => acc + cur.length, 0)

      if (hasArrowPrefix && idx === 0) {
        const prefix = '❯ '
        const content = chunk.padEnd(maxLength + ansiLen, ' ')

        let row = `${leftSide}${prefix}${colors.cyan(`${content}`)}${rightSide}`

        if (/^\s*$/.test(content)) {
          row = row.replace(prefix, ''.padStart(prefix.length, ' '))
        }

        return row
      }

      const content = chunk.padEnd(maxLength + ansiLen + arrowPrefixLen, ' ')
      const colorized = hasArrowPrefix ? colors.cyan(`${content}`) : content

      return `${leftSide}${colorized}${rightSide}`
    })

    const content = formattedChunks.join('\n')
    return content
  }
}
