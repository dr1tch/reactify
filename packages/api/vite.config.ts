import { defineConfig } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import commonjs from "vite-plugin-commonjs"
import { fileURLToPath, URL } from "url"

console.log({ path: resolve(__dirname, "index.ts") })
export default defineConfig({
  plugins: [dts({ insertTypesEntry: true }), commonjs()],
  resolve: {
    alias: [
      {
        find: "@",
        // @ts-ignore
        replacement: fileURLToPath(new URL(".", import.meta.url)),
      },
      {
        find: "@evercam/api",
        // @ts-ignore
        replacement: fileURLToPath(new URL(".", import.meta.url)),
      },
    ],
  },
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    target: "es2019",
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "EvercamAPI",
      fileName: "index",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["moment-timezone", "axios", "humps"],
      output: {
        exports: "named",
      },
    },
  },
})
