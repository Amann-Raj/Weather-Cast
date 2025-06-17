import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// DO NOT import "@tailwindcss/postcss"
export default defineConfig({
  plugins: [react()],
});
