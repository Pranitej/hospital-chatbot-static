import { chatData } from '../data/chatData'

export function getResponse(optionKey) {
  if (optionKey === 'Back to Main Menu') return chatData.welcome
  return chatData[optionKey] ?? chatData.welcome
}

export function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
