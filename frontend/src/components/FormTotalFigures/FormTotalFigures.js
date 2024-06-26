import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import { FORM_STATES } from '../../pages/Home/Home'
import { setTotalFigures } from '../../store/FigureReducer'

const NUM_FIGURE_OPTIONS = [6, 9, 12]

if (process.env.NODE_ENV === 'development') NUM_FIGURE_OPTIONS.push(1, 2, 3)

export const FormTotalFigures = ({ formState, updateFormState }) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onNumberSubmit = (data) => {
    dispatch(setTotalFigures(data['figure-num']))
    updateFormState(FORM_STATES.SESSION_PLAN)
  }

  return (
    <form
      id="form-num-figures"
      data-testid="form-num-figures"
      className={formState === FORM_STATES.TOTAL_FIGURES ? '' : 'hidden'}
      onSubmit={handleSubmit(onNumberSubmit)}
    >
      <h2 className="font-thin text-4xl text-[#66fcf1]">
        Step 1: Number of Figures
      </h2>
      <p>Number of figures that will appear in a session.</p>

      <fieldset className="mt-[10px]">
        {NUM_FIGURE_OPTIONS.map((option) => (
          <div className="col-span-4 my-4" key={`figure-num-${option}}`}>
            <input
              type="radio"
              id={`figure-num-${option}}`}
              name="figure-num"
              defaultValue={option}
              {...register('figure-num', { required: true })}
              className=""
              data-testid="form-figure-option"
            />

            <label className="pl-[5px]" htmlFor={`figure-num-${option}}`}>
              <span>{option}</span>
            </label>
          </div>
        ))}

        <div data-testid="form-figures-error" className="">
          {errors['figure-num']?.type === 'required' &&
            'Error: You must define the number of figures to appear in your drawing session'}
        </div>
      </fieldset>

      <button id="num-figure-submit" type="submit" name="submit">
        Next
      </button>
    </form>
  )
}
