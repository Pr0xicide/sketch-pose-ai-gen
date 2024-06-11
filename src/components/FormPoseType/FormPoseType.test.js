import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen, fireEvent } from '@testing-library/react'

import { render } from '../../_tests/testing-utils'
import { FormPoseType } from './FormPoseType'

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

describe('component structure', () => {
  test('back button exists', () => {
    render(
      <BrowserRouter>
        <FormPoseType />
      </BrowserRouter>,
      { preloadedState }
    )
    const el_back_btn = screen.getByRole('button', { name: /back/i })
    expect(el_back_btn).toBeInTheDocument()
  })

  test('submit button exists', () => {
    render(
      <BrowserRouter>
        <FormPoseType />
      </BrowserRouter>,
      { preloadedState }
    )
    const el_submit_btn = screen.getByRole('button', { name: /start/i })
    expect(el_submit_btn).toBeInTheDocument()
  })
})

describe('form validation', () => {
  test('invalid input', () => {
    render(
      <BrowserRouter>
        <FormPoseType />
      </BrowserRouter>,
      { preloadedState }
    )
    const el_submit_btn = screen.getByRole('button', { name: /start/i })
    const el_form_errors = screen.getByTestId('form-pose-type-error')
    fireEvent.click(el_submit_btn)
    expect(el_form_errors).toBeVisible()
  })
})
