import React, { useCallback, useEffect, useState } from 'react'

const counter = 100

export const SessionPhoto = ({ active, time, url, loadNextPhoto }) => {
  const [timePercentage, setTimePercentage] = useState(100)
  const [timeRemaining, setTimeRemaining] = useState(time)

  const countDown = useCallback(() => {
    if (timeRemaining === 0) {
      loadNextPhoto()
    } else {
      const timeLeft = timeRemaining - counter
      setTimeRemaining(timeLeft)
      setTimePercentage((timeLeft / time) * 100)
    }
  }, [time, timePercentage, setTimePercentage, timeRemaining, setTimeRemaining])

  useEffect(() => {
    let timer

    if (active) {
      timer = setInterval(() => {
        countDown()
      }, counter)
    }

    return () => {
      clearInterval(timer)
    }
  }, [active, countDown])

  return (
    <section className="relative border-2 border-black border-solid p-[15px]">
      <progress
        className="block w-[100%] [&::-webkit-progress-bar]:bg-black [&::-webkit-progress-value]:transition-[width] duration-500 ease-in"
        value={timePercentage}
        max={100}
      >
        <span className="">Duration: {time} milliseconds</span>
      </progress>

      <p
        className={process.env.NODE_ENV === 'development' ? 'block' : 'hidden'}
      >
        Time remaining: {timeRemaining} <br />
        Active: {String(active)}
      </p>

      <img className="block" src={url} alt="" />
    </section>
  )
}
