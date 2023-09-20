# Unoout

> A stylish UI kit to give that visual boost to your command line.

[![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

"Unoout" is a logging library focused on simplicity. Without complicated or excessive configurations, it provides a straightforward and efficient experience for recording your logs. Simple, to the point, and effective.

## Usage

#### Logger

The `Logger` instance is the heart of the library and is responsible for generating log messages. The library exports a default `Logger` instance, but you can also create your own instance.

#### Logger Methods

| Method         | Description                             |
| -------------- | --------------------------------------- |
| `logger.log`   | Standard log                            |
| `logger.info`  | Information log                         |
| `logger.debug` | Debugging log                           |
| `logger.wait`  | Log indicating a wait                   |
| `logger.event` | Log related to events                   |
| `logger.ready` | Log indicating readiness                |
| `logger.warn`  | Warning log                             |
| `logger.off`   | Log indicating shutdown or deactivation |
| `logger.error` | Error log                               |
| `logger.fatal` | Fatal error log                         |

All methods accept the following parameters:

- `message`: The main log message.
- `prefix?`: Optional prefix to be displayed before the message.
- `sufix?`: Optional suffix to be displayed after the message.

Output format:

```js
[level] - ([prefix]) [message] ([sufix)])
```

##### Creating an instance:

You can create your own Logger instance and customize its behavior:

```ts
import { Logger } from 'unoout'
const logger = new Logger({
  output: 'log', // or 'stdout'
  datatime: true,
})
```

- `output`: Defines the output method. If set to `log`, it will use `console.log`. If set to `stdout`, it will use `process.stdout.write`.
- `datatime`: If true, the log will include the date in ISO format.

#### Spinner

The `Spinner` is a logging utility designed for instances where you need to await a promise. It provides a visual loading in the console to indicate a waiting or processing state.

Importing and Creating an Instance:

```ts
import { Spinner } from 'unoout';

const spinner = new Spinner(options?);
```

**Options:**

You can configure the spinner with the following options:

| Option          | Type                 | Description                                       | Default                                  |
| --------------- | -------------------- | ------------------------------------------------- | ---------------------------------------- |
| `frames`        | `string[]`           | The sequence of frames for the spinner animation. | `['. ', '.. ', '...', ' ..', ' .', ' ']` |
| `interval`      | `number`             | The interval (in milliseconds) between frames.    | `250`                                    |
| `defaultLogger` | SpinnerLoggerOptions | Default logger settings for spinner messages.     | `{}`                                     |

The `SpinnerLoggerOptions` allows you to configure the following:

| Option          | Type       | Description                                | Default         |
| --------------- | ---------- | ------------------------------------------ | --------------- |
| `frames`        | `LogLevel` | The log level.                             | `LogLevel.wait` |
| `interval`      | `string`   | Prefix to be displayed before the message. | None            |
| `defaultLogger` | `string`   | Suffix to be displayed after the message.  | None            |

Methods:

- `spinner.start(message: string, prefix?: string, sufix?: string)`: Begins the spinner with the given message, prefix, and suffix.
- `spinner.stop()`: Halts the spinner.
- `spinner.update(message?: string, forceSpin?: boolean, options?: SpinnerLoggerOptions)`: Modifies the spinner's message or options. If forceSpin is true, it triggers the spinner even if it's not currently running.

Usage:

```ts
const spinner = new Spinner()

spinner.start('Loading...')
// ... some async operation
spinner.stop()
```

### Stamp

The `Stamp` class is used to display steps or instructions in the terminal. These steps can be for starting development, bundling code for production, updating a CLI version, among others.

#### Importing and Creating an Instance:

```typescript
import { Stamp } from 'unoout'

const stamp = new Stamp()
```

Methods:

- `stamp.setBoxType(type: BoxKeys)`: Sets the type of the box. Available types are keys from the boxes object.
- `stamp.setInstruction(isInstruction = true)`: Specifies whether the box is an instruction.
- `stamp.setHeading(heading: string)`: Sets the heading for the box.
- `stamp.addMessage(message: string)`: Adds a message to the box.
- `stamp.render()`: Renders the box to the terminal.

### Box Types

The `Stamp` class supports various box types for rendering. Here's an overview of the available box types:

| Box Type  | Characters     |
| --------- | -------------- |
| `single`  | `┌ ─ ┐ │ ┘ └`  |
| `double`  | `╔ ═ ╗ ║ ╝ ╚`  |
| `round`   | `╭ ─ ╮ │ ╯ ╰`  |
| `bold`    | `┏ ━ ┓ ┃ ┛ ┗`  |
| `classic` | `+ - + \| + -` |

Usage:

```ts
const stamp = new Stamp()

stamp
  .setHeading('Development Instructions')
  .addMessage('Install the dependencies.')
  .addMessage('Run the local server.')
  .addMessage('Access the address http://localhost:3000')
  .setInstruction(true)
  .render()
```

### Acknowledgment
Special thanks to the libraries that inspired the creation and enhancement of `unoout`:

- [@poppinss/cliui](https://github.com/poppinss/cliui#installation) - An amazing command-line interface library.
- [deno-library](https://github.com/deno-library/logger) - A versatile and efficient logger for Deno.

Their pioneering work was instrumental in guiding and motivating us in building this library. 🙏
