import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: "app",
    remotes: {

      "dashboardApp": "http://localhost:5001/assets/elprogramadorgtEntry.js"

    },

    shared: ["react", "react-dom"]
  })
  ],
})
