import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { generateChatResponse } from './api/chatCore'

dotenv.config({ path: '.env.local' })

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-gemini-chat-api',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req, res, next) => {
          if (req.method !== 'POST') {
            return next()
          }

          try {
            const body = await new Promise<string>((resolve, reject) => {
              let data = ''
              req.on('data', (chunk) => {
                data += chunk
              })
              req.on('end', () => resolve(data))
              req.on('error', reject)
            })

            const parsed = JSON.parse(body || '{}')
            const message = parsed?.message

            if (!message || typeof message !== 'string') {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Message is required' }))
              return
            }

            const apiKey =
              process.env.GEMINI_API_KEY ||
              process.env.GOOGLE_API_KEY ||
              process.env.GOOGLE_GENERATIVE_AI_API_KEY

            if (!apiKey) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Missing Gemini API key' }))
              return
            }

            const content = await generateChatResponse(message, apiKey)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(content)
          } catch (error) {
            console.error('Local Gemini chat error:', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'AI system connection failed.' }))
          }
        })
      },
    },
  ],
})
