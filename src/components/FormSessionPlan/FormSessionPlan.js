import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FORM_STATES } from '../../pages/Home'
import { SessionLength } from '../SessionLength/SessionLength'
import { resetSession } from '../../store/FigureReducer'

export const FormSessionPlan = ({ formState, updateFormState }) => {
  const { totalFigures, remainingFigures } = useSelector(
    (state) => state.figure
  )
  const dispatch = useDispatch()

  const onBackClicked = (e) => {
    e.preventDefault()
    document.getElementById('form-sessions').reset()
    dispatch(resetSession())
    updateFormState(FORM_STATES.TOTAL_FIGURES)
  }

  const onSessionSubmit = (e) => {
    e.preventDefault()
    updateFormState(FORM_STATES.POSE_TYPE)
  }

  return (
    <form
      id="form-sessions"
      className={formState === FORM_STATES.SESSION_PLAN ? '' : 'hidden'}
      onSubmit={onSessionSubmit}
    >
      <h2>Session Plan</h2>

      <button name="back" onClick={onBackClicked}>
        Back
      </button>

      <section className="">
        Number of figures:&nbsp;
        <span data-testid="total-figures">{totalFigures}</span> <br />
        Remaining figures:&nbsp;
        <span data-testid="total-figures-remaining">{remainingFigures}</span>
      </section>

      <SessionLength type="short" />
      <SessionLength type="average" />
      <SessionLength type="long" />

      <div></div>

      <button
        className=""
        disabled={remainingFigures > 0 ? true : false}
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
