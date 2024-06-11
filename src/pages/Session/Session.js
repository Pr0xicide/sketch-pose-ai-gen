import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { SessionPhoto } from '../../components/SessionPhoto/SessionPhoto'

export const Session = () => {
  const { totalFigures } = useSelector((state) => state.figure)
  const { poseType, photos } = useSelector((state) => state.session)
  const dispatch = useDispatch()

  return (
    <section>
      <div className={totalFigures === 0 ? '' : 'hidden'}>
        Please out the form in the <Link to="/">home page</Link> to begin a
        figure drawing session.
      </div>

      <div className={totalFigures === 0 ? 'hidden' : ''}>
        <h2>
          {poseType} - {totalFigures}
        </h2>
        <ul>
          {photos.map((photo, index) => (
            <li key={index}>
              Duration: {photo.duration} milliseconds
              <SessionPhoto image={photo.url} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
