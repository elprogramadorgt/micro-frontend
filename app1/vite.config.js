import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import federation from "@originjs/vite-plugin-federation"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({

    name: "dashboard_app",
    filename: "elprogramadorgtEntry.js",
    exposes: {
      "./EduTable": "./src/Table"
    },
    shared: ["react", "react-dom", "react-router-dom"]
  })
  ],

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
})
