// @flow
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const input = 'src/index.js';

export default [
  // Universal module definition (UMD) build
  {
    input,
    output: {
      file: 'dist/transform-object.js',
      format: 'umd',
      name: 'transformObject',
    },
    plugins: [
      // Setting development env before running babel etc
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      babel(),
      commonjs({ include: 'node_modules/**' }),
    ],
  },
  // Universal module definition (UMD) build (production)
  {
    input,
    output: {
      file: 'dist/transform-object.min.js',
      format: 'umd',
      name: 'transformObject',
    },
    plugins: [
      // Setting production env before running babel etc
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      babel(),
      commonjs({ include: 'node_modules/**' }),
      uglify(),
    ],
  },
  // ESM build
  {
    input,
    output: {
      file: 'dist/transform-object.esm.js',
      format: 'esm',
    },
    plugins: [babel()],
  },
  // CommonJS build
  {
    input,
    output: {
      file: 'dist/transform-object.cjs.js',
      format: 'cjs',
    },
    plugins: [babel()],
  },
];