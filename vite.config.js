import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/emoji-matcher/",
  build: {
    outDir: "dist",
  },
  publicDir: "public",
});
