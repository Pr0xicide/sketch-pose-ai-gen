import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SessionPhoto } from '../../components/SessionPhoto/SessionPhoto'
import { SessionBlank } from '../../components/SessionBlank/SessionBlank'

export const Session = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { totalFigures } = useSelector((state) => state.figure)
  const { photos } = useSelector((state) => state.session)
  const [activePhoto, setActivePhoto] = useState(0)

  const loadNextPhoto = () => {
    // Invalid session
    if (photos.length === 0) {
      return
    } else if (activePhoto + 1 === photos.length) {
      navigate('/session/recap')
    } else {
      const nextPhoto = activePhoto + 1
      setActivePhoto(nextPhoto)
    }
  }

  return (
    <section>
      {process.env.NODE_ENV === 'development' ? (
        <button onClick={loadNextPhoto}>Next</button>
      ) : (
        <></>
      )}

      {photos.length === 0 ? (
        <SessionBlank />
      ) : (
        <ul>
          {photos.map((photo, index) => (
            <li
              className={index === activePhoto ? 'block' : 'hidden'}
              key={index}
            >
              <SessionPhoto
                active={index === activePhoto ? true : false}
                loadNextPhoto={loadNextPhoto}
                time={photo.duration}
                url={photo.url}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
