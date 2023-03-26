import React from 'react'

export default function Preloader() {
  return (
    <div className='fixed h-full w-full z-50 backdrop-blur-md flex justify-center items-center'>
        <img src="/loader.gif" alt="" className='h-44'/>
    </div>
  )
}
