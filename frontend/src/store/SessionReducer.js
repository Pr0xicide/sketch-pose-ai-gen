import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: 'idle',
  poseType: '',
  photos: [],
}

export const SessionReducer = createSlice({
  name: 'SessionConfig',
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { photos, pose } = action.payload
      state.poseType = pose
      state.photos = photos
    },
    resetSession: (state, action) => {
      state.poseType = ''
      state.photos.splice(0, state.photos.length)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSession, resetSession } = SessionReducer.actions

export default SessionReducer.reducer
