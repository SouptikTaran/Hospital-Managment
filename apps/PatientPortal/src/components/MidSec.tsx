import React from 'react'
import QuickInfoCard from './ui/QuickInfoCard'
import { Clock,Pill,Activity, Calendar  } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button} from "@/components/ui/button"
const MidSec = () => {
  return (
    <> 
        <div className='flex flex-col md:w-[70%] w-full mb-5 gap-5 md:overflow-hidden md:h-[82vh] '>
          <div className='overflow-scroll flex flex-col md:w-[100%] gap-5 w-full scrollbar-thin'>
            <div className='flex flex-wrap gap-5 md:gap-0 w-[100%]  p-1 justify-between  py-4'>
              <QuickInfoCard icons={<Clock color='#007bff' className=' h-8 w-8 md:h-6' strokeWidth={1.5} />} title='Next Appointment' content='Mar 15,10:00 AM'/>
              <QuickInfoCard icons={<Pill color='#22c55e' className=' h-8 w-8 md:h-6' strokeWidth={1.5}/>} title='Active Medications' content='3'/>
              <QuickInfoCard icons={<Activity color='#ef4444' className=' h-8 w-8 md:h-6' strokeWidth={1.5}/>} title='Last Blood Pressure' content='121/73'/>
            </div>
           

           {/* Appointment section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-5 items-center" >
                        <Calendar color="#007bff" strokeWidth={1.5}/>
                      <span className="text-xl font-semibold">Upcoming Appointments</span>
                    </CardTitle>
            
                </CardHeader>
                <CardContent className="flex flex-col gap-5 text-[#46505f] h-[15rem] md:h-[10rem] pb-10">
                    <div className='flex justify-between  items-center p-2 hover:bg-gray-100 rounded-lg '>
                        <div className='flex flex-col gap-4 md:gap-0'>
                          <h1 className='text-md font-bold'>Dr. Emily Chen</h1>
                          <p className='text-xs'>2024-03-15 at 10:00 AM</p>
                        </div>
                        <div className='flex w-[30%] gap-2 flex-col md:flex-row justify-evenly border-black'>
                            <Button className='bg-[#f9fbff] text-black border md:w-[40%] border-gray-100'>Reschedule</Button>
                            {/* <Button className='md:w-[40%]  bg-white text-red-500  border'>Cancel</Button> */}
                        </div>
                    </div>
                    <div className='flex justify-between  items-center p-2 hover:bg-gray-100  rounded-lg '>
                        <div className='flex flex-col gap-4 md:gap-0'>
                          <h1 className='text-md font-bold'>Dr. Emily Chen</h1>
                          <p className='text-xs'>2024-03-15 at 10:00 AM</p>
                        </div>
                        <div className='flex w-[30%] gap-2 flex-col md:flex-row justify-evenly border-black'>
                            <Button className='bg-[#f9fbff] text-black border md:w-[40%] border-gray-100'>Reschedule</Button>
                            {/* <Button className='md:w-[40%] bg-white text-red-500  border'>Cancel</Button> */}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card className=' mb-10'>
                <CardHeader>
                    <CardTitle className="flex gap-5 items-center" >
                        <Activity color="#007bff" strokeWidth={1.5}/>
                      <span className="text-xl font-semibold">Health Monitoring</span>
                    </CardTitle>
            
                </CardHeader>
                <CardContent className="flex flex-col gap-5 text-[#46505f]">
            
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
          </div>
        </div>

    </>
  )
}

export default MidSec