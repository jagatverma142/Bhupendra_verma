import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        base: "Bhupendra_verma",
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
