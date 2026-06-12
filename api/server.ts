import { createServer } from 'http'
import { parse } from 'url'
import { WebSocketServer, WebSocket } from 'ws'
import next from 'next'
import { wsEmitter } from './src/lib/ws-emitter'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: '.' })
const handle = app.getRequestHandler()

const PORT = parseInt(process.env.PORT || '3000', 10)

const clients = new Map<string, { ws: WebSocket; userId?: string; role?: string }>()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res)
  })

  const wsServer = createServer()
  const wss = new WebSocketServer({ server: wsServer })

  wss.on('connection', (ws, req) => {
    const clientId = 'ws_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
    clients.set(clientId, { ws })

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString())
        if (msg.type === 'identify') {
          const entry = clients.get(clientId)
          if (entry) {
            entry.userId = msg.userId
            entry.role = msg.role
          }
        }
      } catch {}
    })

    ws.on('close', () => {
      clients.delete(clientId)
    })
  })

  // Listen for broadcast events from API routes
  wsEmitter.on('broadcast', (event) => {
    const data = JSON.stringify(event)
    clients.forEach(({ ws, userId, role }) => {
      if (ws.readyState !== WebSocket.OPEN) return
      if (event.targetUserId && userId !== event.targetUserId) return
      if (event.targetRoles && role && !event.targetRoles.includes(role)) return
      ws.send(data)
    })
  })

  server.listen(PORT, () => {
    console.log(`> API server ready on http://localhost:${PORT}`)
  })
  wsServer.listen(3001, () => {
    console.log(`> WebSocket server ready on ws://localhost:3001`)
  })
})
