import dts from 'bun-plugin-dts'

await Bun.build({
  format: 'esm',
  minify: true,
  outdir: './dist',
  plugins: [dts()],
  entrypoints: ['./src/index.ts'],
})
