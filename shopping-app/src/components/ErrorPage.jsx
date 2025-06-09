import React from 'react'
import { Link } from 'react-router'

function ErrorPage() {
  return (
    <div className='dark:bg-slate-900 flex justify-center md:justify-start md:pt-40 items-center min-h-[100vh] flex-col gap-y-4 bg-white'>
      <h1 className='dark:text-white text-red-600 text-2xl font-extrabold md:text-3xl'>OOPS!</h1>
      <h2 className='dark:text-white text-red-600 text-xl font-bold md:text-3xl'>Error 404 Page Not Found</h2>
      <Link to="/" className="px-4 py-2 mt-4 text-white dark:hover:bg-red-600 bg-red-600 dark:bg-blue-600 rounded font-bold hover:bg-blue-700 transition">
  Go to Homepage
</Link>
    </div>
  )
}

export default ErrorPage