import { memo } from 'react'
import ChatWindow from './ChatWindow'

const ChatWidget = memo(function ChatWidget({
  messages,
  isOpen,
  isTyping,
  onToggle,
  onOptionClick,
  onReset,
}) {
  const hasUnread = !isOpen && messages.length > 1

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onOptionClick={onOptionClick}
          onClose={onToggle}
          onReset={onReset}
        />
      )}
      <div className="relative">
        {hasUnread && (
          <span
            data-testid="unread-dot"
            className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white z-10"
          />
        )}
        <button
          onClick={onToggle}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center text-white text-2xl transition-colors"
        >
          {isOpen ? '✕' : '🏥'}
        </button>
      </div>
    </div>
  )
})

export default ChatWidget
