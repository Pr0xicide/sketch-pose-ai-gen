import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '../../_tests/testing-utils'
import { SessionLength } from './SessionLength'

const MILLISECONDS = 1000
const MINUTES = MILLISECONDS * 60
const preloadedState = {
  figure: {
    totalFigures: 6,
    remainingFigures: 4,
    sessions: {
      short: [
        {
          id: 'short-session-15',
          duration: 15 * MILLISECONDS,
          amount: 2,
        },
        {
          id: 'short-session-30',
          duration: 30 * MILLISECONDS,
          amount: 0,
        },
        {
          id: 'short-session-60',
          duration: 60 * MILLISECONDS,
          amount: 0,
        },
      ],
      average: [
        {
          id: 'average-session-2',
          duration: 2 * MINUTES,
          amount: 0,
        },
        {
          id: 'average-session-3',
          duration: 3 * MINUTES,
          amount: 0,
        },
      ],
      long: [
        {
          id: 'long-session-5',
          duration: 5 * MINUTES,
          amount: 0,
        },
        {
          id: 'long-session-10',
          duration: 10 * MINUTES,
          amount: 0,
        },
      ],
    },
  },
}

describe('components exists', () => {
  test('correct session length title', () => {
    render(<SessionLength type="short" />, { preloadedState })
    const heading = screen.getByRole('heading', { name: /short/i }).innerHTML
    expect(heading).toBe('Short Length Sessions')
  })

  test('session total amount exists', () => {
    render(<SessionLength type="short" />, { preloadedState })
    const element = screen.getByTestId('total-short-sessions')
    expect(element).toBeInTheDocument()
  })
})

describe('initial state', () => {
  test('correct session total amount is printed', () => {
    render(<SessionLength type="short" />, { preloadedState })
    const sessionTotal = parseInt(
      screen.getByTestId('total-short-sessions').innerHTML
    )
    expect(sessionTotal).toBe(2)
  })
})
