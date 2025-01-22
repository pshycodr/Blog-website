import React from 'react'

function Header({text} : {text:string}) {
  return (
    <div
        className='text-lg sm:text-2xl font-bold text-gray-900'
    >{text}</div>
  )
}

export default Header