import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '../../_tests/testing-utils'
import { FormSessionPlan } from './FormSessionPlan'

const MILLISECONDS = 1000
const MINUTES = MILLISECONDS * 60
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
  test('back button exists', () => {
    render(<FormSessionPlan />, { preloadedState })
    const el_back_btn = screen.getByRole('button', { name: /back/i })
    expect(el_back_btn).toBeInTheDocument()
  })

  test('form submit exists', () => {
    render(<FormSessionPlan />, { preloadedState })
    const el_submit = screen.getByRole('button', { name: /submit/i })
    expect(el_submit).toBeInTheDocument()
  })

  test('total figures element exists', () => {
    render(<FormSessionPlan />, { preloadedState })
    const el_total_figures = screen.getByTestId('total-figures')
    expect(el_total_figures).toBeInTheDocument()
  })

  test('remaining figures element exists', () => {
    render(<FormSessionPlan />, { preloadedState })
    const el_remaining_figures = screen.getByTestId('total-figures-remaining')
    expect(el_remaining_figures).toBeInTheDocument()
  })

  test('proper session lengths exists', () => {
    render(<FormSessionPlan />, { preloadedState })
    const el_submit = screen.getAllByRole('group')
    expect(el_submit.length).toBe(3)
  })
})

describe('initial state', () => {
  test('total amount of figure sessions', () => {
    render(<FormSessionPlan />, { preloadedState })
    const numFigures = parseInt(screen.getByTestId('total-figures').innerHTML)
    expect(numFigures).toBe(preloadedState.figure.totalFigures)
  })

  test('total remaining figure sessions to fill out', () => {
    render(<FormSessionPlan />, { preloadedState })
    const remaining = parseInt(
      screen.getByTestId('total-figures-remaining').innerHTML
    )
    expect(remaining).toBe(preloadedState.figure.remainingFigures)
  })
})
