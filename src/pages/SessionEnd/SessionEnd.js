import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const SessionEnd = () => {
  return (
    <div>
      <h1>Session End</h1>

      <p>
        <Link to="/">Start new session</Link>
      </p>
    </div>
  )
}
