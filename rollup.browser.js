import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import minify from 'rollup-plugin-babel-minify'

export default [{
  input: 'lib/index.js',
  output: {
    name: 'Underlog',
    file: 'lib/browser.min.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    minify({ 
      comments: false 
    }),
  ],
}];
