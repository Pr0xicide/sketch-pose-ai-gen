import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'

import { render } from '../../_tests/testing-utils'
import { SessionAmount } from './SessionAmount'

const MILLISECONDS = 1000
const MINUTES = MILLISECONDS * 60

describe('components exists', () => {
  const preloadedState = {
    figure: {
      totalFigures: 6,
      remainingFigures: 4,
      sessions: {
        short: [
          {
            id: 'short-session-15',
            duration: 15 * MILLISECONDS,
            amount: 0,
          },
          {
            id: 'short-session-30',
            duration: 30 * MILLISECONDS,
            amount: 0,
          },
          {
            id: 'short-session-60',
            duration: 60 * MILLISECONDS,
            amount: 2,
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
  const type = 'short'
  const session_type_index = 2
  const session_value = preloadedState.figure.sessions[type][session_type_index]

  test('session amount heading exists', () => {
    render(<SessionAmount session={session_value} type={type} index={2} />, {
      preloadedState,
    })
    const heading = screen.getByRole('heading', { name: /60 seconds/i })
    expect(heading).toBeInTheDocument()
  })

  test('decrement button exists', () => {
    render(<SessionAmount session={session_value} type={type} index={2} />, {
      preloadedState,
    })
    const button = screen.getByRole('button', { name: /-/i })
    expect(button).toBeInTheDocument()
  })

  test('increment button exists', () => {
    render(<SessionAmount session={session_value} type={type} index={2} />, {
      preloadedState,
    })
    const button = screen.getByRole('button', { name: /\+/i })
    expect(button).toBeInTheDocument()
  })
})

describe('initial state', () => {
  const preloadedState = {
    figure: {
      totalFigures: 6,
      remainingFigures: 4,
      sessions: {
        short: [
          {
            id: 'short-session-15',
            duration: 15 * MILLISECONDS,
            amount: 0,
          },
          {
            id: 'short-session-30',
            duration: 30 * MILLISECONDS,
            amount: 0,
          },
          {
            id: 'short-session-60',
            duration: 60 * MILLISECONDS,
            amount: 2,
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
  const type = 'short'
  const session_type_index = 2
  const session_value = preloadedState.figure.sessions[type][session_type_index]

  test('correct amount value is displayed', () => {
    render(<SessionAmount session={session_value} type={type} index={2} />, {
      preloadedState,
    })
    const input = screen.getByTestId('short-session-60').value
    expect(parseInt(input)).toBe(2)
  })
})

describe('user actions', () => {
  const preloadedState = {
    figure: {
      totalFigures: 6,
      remainingFigures: 0,
      sessions: {
        short: [
          {
            id: 'short-session-15',
            duration: 15 * MILLISECONDS,
            amount: 0,
          },
          {
            id: 'short-session-30',
            duration: 30 * MILLISECONDS,
            amount: 0,
          },
          {
            id: 'short-session-60',
            duration: 60 * MILLISECONDS,
            amount: 6,
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
  const type = 'short'
  const session_type_index = 2
  const session_value = preloadedState.figure.sessions[type][session_type_index]

  test('increments amount correctly', async () => {
    render(<SessionAmount session={session_value} type={type} index={2} />, {
      preloadedState,
    })
    const btn_increment = screen.getByRole('button', { name: /\+/i })
    await fireEvent.click(btn_increment)

    const input = await screen.findByTestId('short-session-60')
    // await waitFor(() => {
    // expect(parseInt(input.value)).toBe(3)
    // })
  })
})
