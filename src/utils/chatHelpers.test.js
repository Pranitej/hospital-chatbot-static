import { describe, it, expect } from 'vitest'
import { getResponse, formatTimestamp, generateId } from './chatHelpers'
import { chatData } from '../data/chatData'

describe('getResponse', () => {
  it('returns welcome data for "Back to Main Menu"', () => {
    expect(getResponse('Back to Main Menu')).toEqual(chatData.welcome)
  })

  it('returns matching flow for a known option key', () => {
    expect(getResponse('Contact Numbers')).toEqual(chatData['Contact Numbers'])
  })

  it('falls back to welcome for unknown keys', () => {
    expect(getResponse('Unknown Key XYZ')).toEqual(chatData.welcome)
  })
})

describe('formatTimestamp', () => {
  it('returns a non-empty string', () => {
    const result = formatTimestamp(new Date('2026-01-01T10:30:00'))
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('uses current time when no argument is passed', () => {
    const result = formatTimestamp()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('generateId', () => {
  it('returns a string starting with "msg-"', () => {
    expect(generateId()).toMatch(/^msg-/)
  })

  it('returns unique ids on consecutive calls', () => {
    const a = generateId()
    const b = generateId()
    expect(a).not.toBe(b)
  })
})
