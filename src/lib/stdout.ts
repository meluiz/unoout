type StdoutCallback = (err?: Error | undefined) => void
type StdoutEncoding = BufferEncoding

/**
 * Writes the given buffer to the standard output.
 *
 * @param buffer - The buffer to be written.
 * @param encoding - The encoding of the buffer.
 * @param callback - An optional callback function to be called after the buffer is written.
 */
export function stdout(buffer: string | Uint8Array, encoding?: StdoutEncoding, callback?: StdoutCallback) {
  process.stdout.write(buffer, encoding, callback)
}

/**
 * Logs the given arguments to the console.
 *
 * @param args - The arguments to be logged.
 */
export function log(...args: unknown[]) {
  console.log(...args)
}
