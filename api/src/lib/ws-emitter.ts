import { EventEmitter } from 'events'

const g = globalThis as any
if (!g.__wsEmitter) {
  g.__wsEmitter = new EventEmitter()
  g.__wsEmitter.setMaxListeners(100)
}

export const wsEmitter: EventEmitter = g.__wsEmitter

export interface WsEvent {
  type: 'new_order' | 'status_change' | 'payment_received' | 'chat_message' | 'order_ready' | 'low_stock' | 'notification'
  payload: Record<string, unknown>
  targetRoles?: string[]
  targetUserId?: string
}

export function broadcast(event: WsEvent) {
  console.log('[WS broadcast]', event.type, event.targetRoles)
  wsEmitter.emit('broadcast', event)
}
