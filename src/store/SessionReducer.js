import { createSlice } from '@reduxjs/toolkit'
import { getSessionPlan } from './FigureReducer'

const TEST_PHOTOS_FILES = [
  require('../_tests/images/1.jpg'),
  require('../_tests/images/2.jpg'),
  require('../_tests/images/3.jpg'),
  require('../_tests/images/4.jpg'),
  require('../_tests/images/5.jpg'),
  require('../_tests/images/6.jpg'),
  require('../_tests/images/7.jpg'),
  require('../_tests/images/8.jpg'),
  require('../_tests/images/9.jpg'),
  require('../_tests/images/10.jpg'),
  require('../_tests/images/11.jpg'),
  require('../_tests/images/12.jpg'),
]

const initialState = {
  poseType: '',
  photos: [],
}

export const SessionReducer = createSlice({
  name: 'SessionConfig',
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { pose, sessions } = action.payload
      const sessionPlan = getSessionPlan(sessions)

      state.poseType = pose.name

      // For local dev environment, use local photos instead.
      if (process.env.NODE_ENV === 'development') {
        for (let i = 0; i < sessionPlan.length; i++) {
          state.photos.push({
            url: TEST_PHOTOS_FILES[i % TEST_PHOTOS_FILES.length],
            duration: sessionPlan[i],
          })
        }
      }
    },
    resetSession: (state, action) => {
      state.photos.splice(0, state.photos.length)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSession, resetSession } = SessionReducer.actions

export default SessionReducer.reducer
