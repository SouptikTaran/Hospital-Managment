import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@repo/ui/components/ui/card"
import { Button} from "@repo/ui/components/ui/button"
import { FileText,Download,Share2,Heart, Calendar, MessageCircle, PhoneCallIcon, VideoIcon, MessageCircleCode} from "lucide-react"
import CalendarBox from 'react-calendar';
import { Link } from "react-router-dom"
import { useState } from "react";
  
const RightSec = () => {
    const [selectedDate,setSelectedDate] = useState(new Date());
    const handleSelectedDate=(date:any)=>{
        setSelectedDate(date);
        console.log("selectedDate is: ",selectedDate);
        
    }
  return (
    <div className="w-full md:w-[30%] border gap-5 flex flex-col overflow-hidden md:h-[83.2vh]">
        <div className="w-full gap-5 flex flex-col overflow-scroll scrollbar-thin">
                <Card className="shadow-md shadow-slate-400  bg-white p-3 h-[8rem] rounded-xl ">
                    <CardHeader >
                        <CardTitle className="flex gap-5 items-center" >
                        <MessageCircle color="#007bff" strokeWidth={1.5}/>
                          <span className="text-[1.06rem] font-semibold">Quick Actions</span>
                        </CardTitle>
                
                    </CardHeader>
                    <CardContent className="flex mt-5 justify-evenly text-[#46505f] h-[15rem] md:h-[10rem] pb-10">
                            <Button className="border w-20 h-12 flex "><PhoneCallIcon/></Button>
                            <Button className="border w-20 h-12 flex "><VideoIcon/></Button>
                            <Button className="border w-20 h-12 flex "><MessageCircle/></Button>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
                

                   {/* Prescription */} 
            <Card  className="shadow-md shadow-slate-400 mb-10 gap-3 bg-white p-5 rounded-xl flex flex-col">
                <CardHeader >
                    <CardTitle className="flex gap-5 items-center" >
                        <Calendar    color="#007bff" strokeWidth={1.5}/>
                       <span className="text-lg font-semibold">Calendar</span>
                    </CardTitle>
                
                </CardHeader>
                <CardContent className="flex flex-col gap-5 text-[#46505f]">
                    <div className='bg-white  flex justify-center items-center border rounded-xl overflow-hidden '>
                        <CalendarBox onChange={handleSelectedDate} value={selectedDate} className="border-transparent"/>
                        
                    </div>
                </CardContent>
                <CardFooter>
                    <Link to='/'  className="w-full"><Button className="w-full border-[#007bff]  border bg-white hover:bg-white hover:shadow-lg text-[#007bff] bg-opacity-90">View All Reports</Button></Link>
                </CardFooter>
            </Card>

            <Card className="shadow-md shadow-slate-400  bg-white p-3 h-[8rem] rounded-xl ">
                    <CardHeader >
                        <CardTitle className="flex gap-5 items-center" >
                        <MessageCircle color="#007bff" strokeWidth={1.5}/>
                          <span className="text-[1.06rem] font-semibold">Messages And Notification</span>
                        </CardTitle>
                
                    </CardHeader>
                    <CardContent className="flex mt-5 justify-evenly text-[#46505f] h-[15rem] md:h-[10rem] pb-10">
                          
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
        </div>
    </div>
  )
}

export default RightSec