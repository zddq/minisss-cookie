import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: "src/index.ts",
  output: [
    { format: "esm", file: "dist/index.esm.js" },
    { format: "cjs", file: "dist/index.cjs.js" },
    { format: "umd", file: "dist/index.umd.js", name: "miniCookie" },
  ],
  plugins: [
    del({ targets: ["dist/*"] }),
    nodeResolve(),
    typescript(),
    commonjs(),
    json(),
    babel({ babelHelpers: "bundled", browserslistConfigFile: true, presets: [["@babel/preset-env", { targets: { ie: "11" } }]], }),
    terser({ compress: { drop_console: true, drop_debugger: true, }, }),
  ],
};

export default config;
