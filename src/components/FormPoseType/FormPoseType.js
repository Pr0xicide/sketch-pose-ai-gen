import React from 'react'
import { useForm } from 'react-hook-form'

import { FORM_STATES } from '../../pages/Home'

const POSES_PROMPTS = [
  {
    name: 'standing',
  },
  {
    name: 'sitting',
  },
  {
    name: 'walking',
  },
  {
    name: 'running',
  },
  {
    name: 'martial arts',
  },
  {
    name: 'jumping',
  },
  {
    name: 'stretching',
  },
]

export const FormPoseType = ({ formState, updateFormState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onBackClicked = (e) => {
    e.preventDefault()
    document.getElementById('form-pose-type').reset()
    updateFormState(FORM_STATES.SESSION_PLAN)
  }

  const onFormSubmit = (data) => {}

  return (
    <form
      id="form-pose-type"
      className={formState === FORM_STATES.POSE_TYPE ? '' : 'hidden'}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <h2>Pose Type</h2>

      <button name="back" onClick={onBackClicked}>
        Back
      </button>

      <p>
        Select a catagory that the figures will pose be generated for the
        session.
      </p>

      {POSES_PROMPTS.map((pose, index) => (
        <label className="block" key={index}>
          <input
            name="pose-type"
            type="radio"
            value={pose.name}
            {...register('pose', { required: true })}
          />
          &nbsp;{pose.name}
        </label>
      ))}

      <div data-testid="form-pose-type-error" className="">
        {errors['pose']?.type === 'required' && 'Error: Select a pose type'}
      </div>

      <button id="submit-pose-type" type="submit" name="submit">
        Start
      </button>
    </form>
  )
}
