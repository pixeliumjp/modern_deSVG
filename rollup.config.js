import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import polyfills from "rollup-plugin-node-polyfills";

export default [
  {
    input: "src/desvg.js",
    output: {
      file: "dist/esm/desvg.min.js",
      format: "esm", // IIFE形式にする場合（ブラウザで直接使用するため）
    },
    plugins: [
      resolve(), // これでモジュール解決を行います
      polyfills(),
      postcss(),
      terser(),
    ],
    context: "window",
  },
  {
    input: "src/desvg.js",
    output: {
      file: "dist/esm/desvg.js",
      format: "esm", // IIFE形式にする場合（ブラウザで直接使用するため）
    },
    plugins: [
      resolve(), // これでモジュール解決を行います
      polyfills(),
      postcss(),
    ],
    context: "window",
  },
];
