import React from 'react'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { FORM_STATES } from '../../pages/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { setSession } from '../../store/SessionReducer'
import { getSessionPlan } from '../../store/FigureReducer'

export const POSES_PROMPTS = [
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
  const navigate = useNavigate()
  const { sessions } = useSelector((state) => state.figure)
  const dispatch = useDispatch()

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

  const onFormSubmit = async (data) => {
    const { pose } = data

    // API call to create a session.
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/session/create`,
      {
        pose: POSES_PROMPTS[pose].name,
        sessionDurations: getSessionPlan(sessions),
        env: process.env.NODE_ENV,
      }
    )

    // If successful, proceed to start session..
    if (res.data.success) {
      const { data } = res.data
      dispatch(setSession(data))
      navigate('/session')
    }
  }

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
            value={index}
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
