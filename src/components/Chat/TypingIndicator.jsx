export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-4 py-1">
      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <span className="text-xs">🏥</span>
      </div>
      <div
        role="status"
        aria-label="Bot is typing"
        className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            data-testid="typing-dot"
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
