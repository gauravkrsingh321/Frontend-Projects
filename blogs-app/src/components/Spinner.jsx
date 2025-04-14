import React from 'react'
import './Spinner.css'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center flex-col w-full h-screen'>
      <div className='spinner'></div>
      <p className='font-bold text-lg'>Loading...</p>        
    </div>
  )
}

export default Spinner