import { configureStore } from '@reduxjs/toolkit'
import { FigureReducer } from './FigureReducer'

export default configureStore({
  reducer: {
    figure: FigureReducer.reducer,
  },
})
