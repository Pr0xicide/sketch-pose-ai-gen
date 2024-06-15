import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetFigureForm } from '../../store/FigureReducer'
import { resetSession } from '../../store/SessionReducer'

export const SessionRecap = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { poseType, photos } = useSelector((state) => state.session)

  const onHomepageClicked = () => {
    dispatch(resetFigureForm())
    dispatch(resetSession())
    navigate('/')
  }

  return (
    <div>
      <h1>Session Recap</h1>

      <p>Total Figures: {photos.length}</p>
      <p>Pose type: {poseType}</p>

      <ul>
        {photos.map((photo, index) => (
          <li key={index}>
            <img src={photo.url} width={150} alt="" />
            <p>
              Download:{' '}
              <a href={photo.url} download>
                Session Photo {index + 1}
              </a>
            </p>
          </li>
        ))}
      </ul>

      <button onClick={onHomepageClicked}>Homepage</button>
    </div>
  )
}
