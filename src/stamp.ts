import { Logger } from './logger'
import { boxes, colors, Line } from './utils'

// Define the keys of the boxes object
type BoxKeys = keyof typeof boxes

// Define the structure of the StampState object
interface StampState {
  type: BoxKeys
  heading: string | null
  messages: string[]
  isInstruction: boolean
}

export class Stamp {
  // Initialize the state with default values
  private state: StampState = {
    heading: null,
    messages: [],
    type: 'round',
    isInstruction: false,
  }

  /**
   * Set the type of the box.
   * @param type - The type of the box.
   * @returns The Stamp instance.
   */
  public setBoxType(type: BoxKeys): this {
    this.state.type = type
    return this
  }

  /**
   * Set whether the box is an instruction.
   * @param isInstruction - Whether the box is an instruction.
   * @returns The Stamp instance.
   */
  public setInstruction(isInstruction = true): this {
    this.state.isInstruction = isInstruction
    return this
  }

  /**
   * Set the heading of the box.
   * @param heading - The heading of the box.
   * @returns The Stamp instance.
   */
  public setHeading(heading: string): this {
    this.state.heading = heading
    return this
  }

  /**
   * Add a message to the box.
   * @param message - The message to add.
   * @returns The Stamp instance.
   */
  public addMessage(message: string): this {
    this.state.messages.push(message)
    return this
  }

  /**
   * Render the box.
   */
  public render(): void {
    const line = new Line(this.state.type, 56)
    const logger = new Logger()
    const { heading, messages, isInstruction } = this.state

    const top = line.getTopLine()
    const bottom = line.getBottomLine()
    const horizontal = line.getHorizontalLine()
    const gutter = line.getGutterLine()

    let output = `${top}\n`

    // Add the heading if present
    if (heading) {
      output += `${colors.dim(`${line.getContentLine(heading)}\n`)}`
      output += `${horizontal}\n`
    }

    output += `${gutter}\n`

    // Add the messages
    for (const message of messages) {
      output += `${line.getContentLine(message, isInstruction)}\n`
    }

    output += `${gutter}\n${bottom}\n`

    // Log the output
    logger.log(output)
  }
}
