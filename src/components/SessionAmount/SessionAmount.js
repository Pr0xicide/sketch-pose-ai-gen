import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  incrementSessionAmount,
  decrementSessionAmount,
} from '../../store/FigureReducer'

export const SessionAmount = ({ session, type, index }) => {
  const { remainingFigures } = useSelector((state) => state.figure)
  const dispatch = useDispatch()
  const sessionTime = session.duration / 1000

  const onDecrement = (e) => {
    e.preventDefault()
    dispatch(
      decrementSessionAmount({
        type,
        index,
      })
    )
  }

  const onIncrement = (e) => {
    e.preventDefault()
    dispatch(
      incrementSessionAmount({
        type,
        index,
      })
    )
  }

  return (
    <>
      <h3>
        {sessionTime <= 60
          ? `${sessionTime} seconds`
          : `${sessionTime / 60} minutes`}
      </h3>

      <button
        name="decrement"
        className="text-center border-solid border-2 border-black p-[10px]"
        onClick={onDecrement}
      >
        -
      </button>

      <input
        type="number"
        id={session.id}
        data-testid={session.id}
        name={session.id}
        className="text-center"
        value={session.amount}
        disabled={true}
      />

      <button
        name="increment"
        className="text-center border-solid border-2 border-black p-[10px]"
        onClick={onIncrement}
      >
        +
      </button>
    </>
  )
}
