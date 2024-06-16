import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { FormTotalFigures } from './FormTotalFigures'

import { render } from '../../_tests/testing-utils'

describe('components exists', () => {
  test('if form is defined', () => {
    render(<FormTotalFigures />)
    const el_form = screen.getByTestId('form-num-figures')
    expect(el_form).toBeInTheDocument()
  })

  test('form has submit button', () => {
    render(<FormTotalFigures />)
    const el_submit = screen.getByRole('button', { name: 'Next' })
    expect(el_submit).toBeInTheDocument()
  })

  test('at least one option exists for the user to select', () => {
    render(<FormTotalFigures />)
    const el_options = screen.getAllByTestId('form-figure-option')
    expect(el_options.length).toBeGreaterThanOrEqual(1)
  })

  test('form has error messages container', () => {
    render(<FormTotalFigures />)
    const el_form_errors = screen.getByTestId('form-figures-error')
    expect(el_form_errors).toBeInTheDocument()
  })
})

describe('form validation', () => {
  test('invalid input', () => {
    render(<FormTotalFigures />)
    const el_submit = screen.getByRole('button', { name: 'Next' })
    const el_form_errors = screen.getByTestId('form-figures-error')
    fireEvent.click(el_submit)
    expect(el_form_errors).toBeVisible()
  })
})
