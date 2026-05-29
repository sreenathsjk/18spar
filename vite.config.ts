import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  // Set the base path. If deploying to sreenathsjk.github.io/18spar/, set to "/18spar/".
  // If you are using a custom domain (e.g. 18spar.com), set this to "/".
  base: process.env.GITHUB_ACTIONS && !process.env.CUSTOM_DOMAIN ? "/18spar/" : "/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
