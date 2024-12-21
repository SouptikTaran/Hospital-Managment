import { LeftSection } from '@/components/LeftSection'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div className='w-full flex overflow-hidden h-[100vh]'>
        <LeftSection/>
        <div className='w-[90%] h-[100vh] overflow-scroll scrollbar-thin'>
          <Outlet/>
        </div>
      </div>
    
        
    </>
  )
}

export default Layout