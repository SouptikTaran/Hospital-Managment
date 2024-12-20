import React from 'react'
import { LeftSection } from '../components/LeftSection'
import MidSec from '../components/MidSec'
import Navbar from '../components/ui/Navbar'
import BottomNav from '../components/BottomNav'
import RightSec from '../components/RightSec'

const Dashboard = () => {
  return (
    <>
        <div className='flex font-raleway '>
          <LeftSection/>
          <div className='flex flex-col w-full'>
              <Navbar/>
             
              <section className='border w-[100%] justify-evenly p-5 flex flex-col md:flex-row'>
                <MidSec/>
                <RightSec/>
              </section>
          </div>
          
        </div>
        <div className='fixed bottom-0 w-full'><BottomNav/></div>
    </>
  )
}

export default Dashboard