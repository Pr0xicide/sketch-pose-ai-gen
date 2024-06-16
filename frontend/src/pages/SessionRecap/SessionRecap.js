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
            <p>Session Photo: {index + 1}</p>
            <img src={photo.url} width={150} alt="" />
            <p>
              <a href={photo.url} download target="blank">
                Download
              </a>
            </p>
          </li>
        ))}
      </ul>

      <button onClick={onHomepageClicked}>Homepage</button>
    </div>
  )
}
