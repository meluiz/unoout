import dts from 'bun-plugin-dts'

await Bun.build({
  format: 'esm',
  minify: true,
  splitting: true,
  target: 'browser',
  outdir: './dist',
  plugins: [dts()],
  entrypoints: ['./src/index.ts'],
  external: ['picocolors', 'log-update'],
})
