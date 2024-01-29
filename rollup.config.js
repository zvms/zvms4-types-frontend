import { defineConfig } from 'rollup'
import { dts } from 'rollup-plugin-dts'

export default defineConfig({
  input: 'types/index.d.ts',
  plugins: [dts()],
  output: {
    file: 'dist/index.d.ts',
    format: 'es'
  }
})