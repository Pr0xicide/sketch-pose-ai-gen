import { configureStore } from '@reduxjs/toolkit'
import { FigureReducer } from './FigureReducer'
import { SessionReducer } from './SessionReducer'

export default configureStore({
  reducer: {
    figure: FigureReducer.reducer,
    session: SessionReducer.reducer,
  },
})
