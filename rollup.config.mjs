import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer"

/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: [
    { format: "umd", file: "out/index.umd.js", name: "MSCookie" },
    { format: "esm", file: "out/index.esm.js" },
    { format: "cjs", file: "out/index.cjs.js" },
  ],
  plugins: [
    del({ targets: ["out/*"] }),
    nodeResolve(),
    typescript(),
    commonjs(),
    json(),
    babel({ babelHelpers: "bundled", browserslistConfigFile: true, presets: [["@babel/preset-env", { targets: { ie: "11" } }]], }),
    terser({ compress: { drop_console: true, drop_debugger: true, }, }),
    // visualizer({ filename: "analyzer.html", })
  ]
};

