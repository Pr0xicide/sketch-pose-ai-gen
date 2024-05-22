import { createSlice } from '@reduxjs/toolkit'

const MILLISECONDS = 1000
const MINUTES = MILLISECONDS * 60

const initialState = {
  totalFigures: 0,
  remainingFigures: 0,
  sessions: {
    short: [
      {
        id: 'short-session-15',
        duration: 15 * MILLISECONDS,
        amount: 0,
      },
      {
        id: 'short-session-30',
        duration: 30 * MILLISECONDS,
        amount: 0,
      },
      {
        id: 'short-session-60',
        duration: 60 * MILLISECONDS,
        amount: 0,
      },
    ],
    average: [
      {
        id: 'average-session-2',
        duration: 2 * MINUTES,
        amount: 0,
      },
      {
        id: 'average-session-3',
        duration: 3 * MINUTES,
        amount: 0,
      },
    ],
    long: [
      {
        id: 'long-session-5',
        duration: 5 * MINUTES,
        amount: 0,
      },
      {
        id: 'long-session-10',
        duration: 10 * MINUTES,
        amount: 0,
      },
    ],
  },
}

const getSessionTotals = (sessions) => {
  let sum = 0

  sessions.short.forEach((session) => {
    sum += session.amount
  })
  sessions.average.forEach((session) => {
    sum += session.amount
  })
  sessions.long.forEach((session) => {
    sum += session.amount
  })

  return sum
}

export const FigureReducer = createSlice({
  name: 'FigureConfig',
  initialState,
  reducers: {
    setTotalFigures: (state, action) => {
      state.totalFigures = action.payload
      state.remainingFigures = action.payload
    },
    resetSession: (state, action) => {
      state.totalFigures = 0
      state.remainingFigures = 0

      state.sessions['short'].forEach((session) => {
        session.amount = 0
      })
      state.sessions['average'].forEach((session) => {
        session.amount = 0
      })
      state.sessions['long'].forEach((session) => {
        session.amount = 0
      })
    },
    incrementSessionAmount: (state, action) => {
      const { type, index } = action.payload

      // User has no remaining figures left to select from.
      if (state.remainingFigures <= 0) {
        return
      } else if (state.sessions[type][index].amount >= state.totalFigures) {
        state.sessions[type][index].amount = state.totalFigures
      } else {
        ++state.sessions[type][index].amount
      }

      state.remainingFigures =
        state.totalFigures - getSessionTotals(state.sessions)
    },
    decrementSessionAmount: (state, action) => {
      const { type, index } = action.payload

      if (state.sessions[type][index].amount <= 0) {
        state.sessions[type][index].amount = 0
      } else {
        --state.sessions[type][index].amount
      }

      state.remainingFigures =
        state.totalFigures - getSessionTotals(state.sessions)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setTotalFigures,
  resetSession,
  incrementSessionAmount,
  decrementSessionAmount,
} = FigureReducer.actions

export default FigureReducer.reducer
