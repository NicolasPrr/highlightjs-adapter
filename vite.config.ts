import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      name: "highlightjs-adapter",
      entry: resolve(__dirname, "src/lib/index.ts"),
      formats: ["es", "umd"],
      fileName: (format) => `highlightjs-adapter.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "highlight"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "highlight": "highlight"
        },
      },
    },
  },
});
