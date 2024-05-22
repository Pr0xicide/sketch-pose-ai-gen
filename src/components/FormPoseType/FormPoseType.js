import React from 'react'

import { FORM_STATES } from '../../pages/Home'

const POSES = [
  'standing',
  'sitting down',
  'stretching',
  'walking',
  'running',
  'performing martial arts',
]
let prompt =
  'Generate dynamic photos of an adult human sitting down with a white background'

export const FormPoseType = ({ formState, updateFormState }) => {
  const onBackClicked = (e) => {
    e.preventDefault()
    document.getElementById('form-pose-type').reset()
    updateFormState(FORM_STATES.SESSION_PLAN)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form
      id="form-pose-type"
      className={formState === FORM_STATES.POSE_TYPE ? '' : 'hidden'}
      onSubmit={onFormSubmit}
    >
      <button name="back" onClick={onBackClicked}>
        Back
      </button>
      <h2>Figure</h2>
    </form>
  )
}
