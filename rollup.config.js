const pkg = require('./package.json')
const pluginTypescript = require('rollup-plugin-typescript2')
const pluginSourceMap = require('rollup-plugin-sourcemaps')
const pluginDts = require('rollup-plugin-dts').default

console.log(pluginDts)

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
    },
  ],

  external: [
    'vue-demi'
  ],

  plugins: [
    pluginTypescript(),
    pluginSourceMap()
  ]
}