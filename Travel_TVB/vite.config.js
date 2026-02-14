import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '01bc7c37a2f6.ngrok-free.app',
      '484d62a26b29.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io',
    ]
  }
})