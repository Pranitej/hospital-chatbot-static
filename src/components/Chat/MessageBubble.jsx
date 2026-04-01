import { SENDER } from '../../constants'

export default function MessageBubble({ sender, text, timestamp }) {
  const isBot = sender === SENDER.BOT

  return (
    <div className={`flex items-start gap-2 px-4 py-1 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div
          data-testid="bot-avatar"
          className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0"
        >
          <span className="text-xs text-white">🏥</span>
        </div>
      )}
      <div className={`max-w-[75%] flex flex-col ${isBot ? '' : 'items-end'}`}>
        <div
          className={
            isBot
              ? 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 text-sm whitespace-pre-wrap'
              : 'bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm'
          }
        >
          {text}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  )
}
