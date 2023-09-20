# Unoout

> A stylish UI kit to give that visual boost to your command line.

[![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

"Unoout" is a logging library focused on simplicity. Without complicated or excessive configurations, it provides a straightforward and efficient experience for recording your logs. Simple, to the point, and effective.

<!--
## Table of contents

- [Installation](#installation)
- [Logger](#logger)
  - [`log(message, prefix?, sufix?)`](#logmessage-prefix-sufix)
  - [`info(message, prefix?, sufix?)`](#infomessage-prefix-sufix)
  - [`debug(message, prefix?, sufix?)`](#debugmessage-prefix-sufix)
  - [`wait(message, prefix?, sufix?)`](#waitmessage-prefix-sufix)
  - [`event(message, prefix?, sufix?)`](#eventmessage-prefix-sufix)
  - [`ready(message, prefix?, sufix?)`](#readymessage-prefix-sufix)
  - [`warn(message, prefix?, sufix?)`](#warnmessage-prefix-sufix)
  - [`off(message, prefix?, sufix?)`](#offmessage-prefix-sufix)
  - [`error(message, prefix?, sufix?)`](#errormessage-prefix-sufix)
  - [`fatal(message, prefix?, sufix?)`](#fatalmessage-prefix-sufix) -->

## Instalação

Install the package from npm registry as follows:

```sh
npm i unoout

# bun
bun add unoout

# yarn
yarn add unoout

# pnpm
pnpm add unoout
```

and then use it as follows:

```ts
import logger from 'unoout'

logger.log('Hello World')
```
