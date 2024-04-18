import React from 'react'

export default function NavButton({children, ...props}) {
  return (
    <button className='cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2.5 rounded-lg' {...props}>
        {children}
    </button>
  )
}
