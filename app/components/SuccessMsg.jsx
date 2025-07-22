import Link from 'next/link'
import React from 'react'

const SuccessMsg = () => {
  return (
    <div className='w-[30%] bg-green-500 flex justify-center items-center flex-col gap-4 p-10 m-auto mt-20 rounded-lg'>
        <h1 className='font-bold'>Feedback Submitted Successfully</h1>
        <Link href = "/"><button className='bg-green-800 p-2 rounded-lg text-white cursor-pointer' >Back to Home</button></Link>

    </div>
  )
}

export default SuccessMsg