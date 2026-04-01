import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useChat } from './useChat'
import { SENDER } from '../constants'
import { chatData } from '../data/chatData'

describe('useChat', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('initializes with welcome bot message, isOpen false, isTyping false', () => {
    const { result } = renderHook(() => useChat())
    expect(result.current.isOpen).toBe(false)
    expect(result.current.isTyping).toBe(false)
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].sender).toBe(SENDER.BOT)
    expect(result.current.messages[0].text).toBe(chatData.welcome.text)
    expect(result.current.messages[0].options).toEqual(chatData.welcome.options)
  })

  it('toggleChat flips isOpen', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.toggleChat())
    expect(result.current.isOpen).toBe(true)
    act(() => result.current.toggleChat())
    expect(result.current.isOpen).toBe(false)
  })

  it('handleOptionClick adds user message immediately', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.handleOptionClick('Contact Numbers'))
    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[1].sender).toBe(SENDER.USER)
    expect(result.current.messages[1].text).toBe('Contact Numbers')
  })

  it('handleOptionClick sets isTyping true then adds bot reply after 400ms', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.handleOptionClick('Contact Numbers'))
    expect(result.current.isTyping).toBe(true)
    act(() => vi.advanceTimersByTime(400))
    expect(result.current.isTyping).toBe(false)
    expect(result.current.messages).toHaveLength(3)
    expect(result.current.messages[2].sender).toBe(SENDER.BOT)
    expect(result.current.messages[2].text).toBe(chatData['Contact Numbers'].text)
  })

  it('resetChat returns to single welcome message', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.handleOptionClick('Contact Numbers'))
    act(() => vi.advanceTimersByTime(400))
    act(() => result.current.resetChat())
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].text).toBe(chatData.welcome.text)
    expect(result.current.isTyping).toBe(false)
  })
})
