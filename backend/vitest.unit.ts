import { defineConfig } from "vitest/config";
import path from "path";


export default defineConfig({
  test: {
    environment: "node",
    include: ["./src/**/*.test.ts"],
    exclude: [],
    reporters: ["html", "verbose"],
    outputFile: "./.vitest/html",
    alias: {
      "@/": path.resolve(__dirname, "./src/"),
    },
  },
});