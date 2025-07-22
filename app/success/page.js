import Link from 'next/link';
import React from 'react'

const Page = () => {
  return (
    <div className="sm:w-[30%] w-[90%] mx-auto bg-green-100 p-8 rounded-lg shadow-md text-center mt-20">
        <h2 className="text-2xl font-bold mb-6">Feedback submitted successfully</h2>
        <Link href="/">
        <button 
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition hover:cursor-pointer"
            >
            Go to home
        </button>
            </Link>
    </div>
  )
}

export default Page;