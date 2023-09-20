# unoout

## 0.3.5

### Patch Changes

- a543a28: feat(release.yml): add release workflow to automate version release process

## 0.3.4

### Patch Changes

- 8ab7deb: fix(logger.ts): fix datetime property in Logger class to use the value of this.datetime instead of hardcoded true value

## 0.3.3

### Patch Changes

- 728fb56: fix: correct typo in Logger options from 'datatime' to 'datetime'

## 0.3.2

### Patch Changes

- c9ee4dc: fix(README): badge image

## 0.3.1

### Patch Changes

- 4c606df: Move the `@changesets/cli` to devDependencies and add docs on README.md

## 0.3.0

### Minor Changes

- b650a85: Created an instance of Stamp, which can be used for generating sticker panel with instructions or not

## 0.2.0

### Minor Changes

- 6fccc1b: - Created an instance of Spinner, which can be used for generating logs that need to wait for a response.

## 0.1.1

### Patch Changes

- 512cc82: chore(build.config.ts): add 'picocolors' and 'log-update' to the external dependencies list to exclude them from the build process

## 0.1.0

### Minor Changes

- 8ab2b3c: - Created an instance of Logger, which can be used for generating custom logs in the command lines.
  - Created a function for coloring output using picocolors.
  - Functions for output (logEntry) and level control have been created.
  - Variables for controlling panels, stamps, boxes, and symbols are also accessible.
