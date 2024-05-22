import React from 'react'
import { useSelector } from 'react-redux'
import { SessionAmount } from '../SessionAmount/SessionAmount'

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getSessionLengthTotals = (sessions, type) => {
  let sum = 0

  sessions[type].forEach((session) => {
    sum += session.amount
  })

  return sum
}

export const SessionLength = ({ type }) => {
  const { sessions } = useSelector((state) => state.figure)

  return (
    <fieldset id={`${type}-sessions`}>
      <h2>{capitalizeFirstLetter(type)} Length Sessions</h2>
      {sessions[type].map((session, i) => (
        <div id={session.id} key={session.id} className="mb-[5px]">
          <SessionAmount index={i} type={type} session={session} />
        </div>
      ))}

      <div className="mt-[10px]">
        Total {type} sessions:&nbsp;
        <span data-testid={`total-${type}-sessions`}>
          {getSessionLengthTotals(sessions, type)}
        </span>
      </div>

      <hr />
    </fieldset>
  )
}
