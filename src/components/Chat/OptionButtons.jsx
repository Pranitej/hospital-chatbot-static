export default function OptionButtons({ options, onSelect, disabled }) {
  if (!options || options.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={disabled}
          aria-label={option}
          className="text-sm border border-blue-300 text-blue-700 rounded-full px-3 py-1.5 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
