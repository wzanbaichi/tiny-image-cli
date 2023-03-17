import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/*.ts'],
  format: ['esm'],
  target: 'node14.8',
  clean: true,
  dts: true,
  splitting: true,
  shims: true
})
