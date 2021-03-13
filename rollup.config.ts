import pkg from './package.json'
import pluginTypescript from 'rollup-plugin-typescript2'
import pluginSourceMap from 'rollup-plugin-sourcemaps'
import pluginDts from 'rollup-plugin-dts'

module.exports = {
  input: 'index.ts',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      exports: 'named',
      sourcemap: true
    },
    {
      format: 'es',
      file: pkg.module,
      exports: 'named',
      sourcemap: true
    }
  ],

  external: [
    'vue-demi'
  ],

  plugins: [
    pluginTypescript(),
    pluginSourceMap()
  ]
}
