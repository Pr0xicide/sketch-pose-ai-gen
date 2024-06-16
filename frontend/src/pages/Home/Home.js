import React, { useEffect, useState } from 'react'
import { FormTotalFigures } from '../../components/FormTotalFigures/FormTotalFigures'
import { FormSessionPlan } from '../../components/FormSessionPlan/FormSessionPlan'
import { FormPoseType } from '../../components/FormPoseType/FormPoseType'

export const FORM_STATES = {
  TOTAL_FIGURES: 0,
  SESSION_PLAN: 1,
  POSE_TYPE: 2,
}

export const Home = () => {
  const [formState, setFormState] = useState(FORM_STATES.TOTAL_FIGURES)

  return (
    <section>
      <FormTotalFigures formState={formState} updateFormState={setFormState} />
      <FormSessionPlan formState={formState} updateFormState={setFormState} />
      <FormPoseType formState={formState} updateFormState={setFormState} />
    </section>
  )
}
