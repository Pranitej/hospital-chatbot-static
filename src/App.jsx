import ChatWidget from './components/Chat/ChatWidget'
import { useChat } from './hooks/useChat'

export default function App() {
  const { messages, isOpen, isTyping, toggleChat, handleOptionClick, resetChat } = useChat()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
      <div className="text-center select-none">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">City Hospital</h1>
        <p className="text-gray-500 text-sm">Click the chat button to get started.</p>
      </div>
      <ChatWidget
        messages={messages}
        isOpen={isOpen}
        isTyping={isTyping}
        onToggle={toggleChat}
        onOptionClick={handleOptionClick}
        onReset={resetChat}
      />
    </div>
  )
}
