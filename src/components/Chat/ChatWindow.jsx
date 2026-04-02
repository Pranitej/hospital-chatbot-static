import { useEffect, useRef, memo } from 'react'
import { SENDER } from '../../constants'
import MessageBubble from './MessageBubble'
import OptionButtons from './OptionButtons'
import TypingIndicator from './TypingIndicator'

const ChatWindow = memo(function ChatWindow({ messages, isTyping, onOptionClick, onClose, onReset }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const lastBotMsgIndex = messages.reduce(
    (acc, msg, i) => (msg.sender === SENDER.BOT ? i : acc),
    -1
  )

  return (
    <div
      role="dialog"
      aria-labelledby="chat-header-title"
      className="flex flex-col w-screen h-screen sm:w-[380px] sm:h-[520px] bg-white sm:rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-blue-600 px-4 py-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <span className="text-lg">🏥</span>
        </div>
        <div className="flex-1">
          <h2 id="chat-header-title" className="text-white font-semibold text-sm">
            City Hospital
          </h2>
          <p className="text-green-300 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
            Online
          </p>
        </div>
        <button
          onClick={onReset}
          aria-label="Restart chat"
          className="text-white/70 hover:text-white text-sm mr-2"
        >
          ↺
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-white/70 hover:text-white text-lg leading-none"
        >
          ✕
        </button>
      </div>

      {/* Message list */}
      <div
        className="flex-1 overflow-y-auto py-3 bg-gray-50"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((msg, index) => (
          <div key={msg.id}>
            <MessageBubble sender={msg.sender} text={msg.text} timestamp={msg.timestamp} />
            {msg.sender === SENDER.BOT && msg.options?.length > 0 && (
              <OptionButtons
                options={msg.options}
                onSelect={onOptionClick}
                disabled={index !== lastBotMsgIndex || isTyping}
              />
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-2 bg-white border-t border-gray-100 flex-shrink-0">
        Powered by City Hospital
      </div>
    </div>
  )
})

export default ChatWindow
