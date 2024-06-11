import React from 'react'

export const SessionPhoto = ({ image }) => {
  return (
    <div className="border-2 border-black border-solid p-[15px]">
      <img className="" src={image} alt="" />
    </div>
  )
}
