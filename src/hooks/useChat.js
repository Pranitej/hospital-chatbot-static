import { useState, useCallback, useEffect, useRef } from 'react'
import { SENDER } from '../constants'
import { chatData } from '../data/chatData'
import { getResponse, formatTimestamp, generateId } from '../utils/chatHelpers'

function makeMessage(sender, text, options = []) {
  return { id: generateId(), sender, text, timestamp: formatTimestamp(), options }
}

export function useChat() {
  const [messages, setMessages] = useState(() => [
    makeMessage(SENDER.BOT, chatData.welcome.text, chatData.welcome.options),
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), [])

  const handleOptionClick = useCallback((optionKey) => {
    const userMsg = makeMessage(SENDER.USER, optionKey)
    setMessages((prev) => {
      const next = [...prev, userMsg]
      return next.length > 100 ? next.slice(-100) : next
    })
    setIsTyping(true)
    timerRef.current = setTimeout(() => {
      const response = getResponse(optionKey)
      const botMsg = makeMessage(SENDER.BOT, response.text, response.options)
      setMessages((prev) => {
        const next = [...prev, botMsg]
        return next.length > 100 ? next.slice(-100) : next
      })
      setIsTyping(false)
    }, 400)
  }, [])

  const resetChat = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsTyping(false)
    setMessages([makeMessage(SENDER.BOT, chatData.welcome.text, chatData.welcome.options)])
  }, [])

  return { messages, isOpen, isTyping, toggleChat, handleOptionClick, resetChat }
}
