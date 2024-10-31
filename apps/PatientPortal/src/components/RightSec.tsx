import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@repo/ui/components/ui/card"
import { Button} from "@repo/ui/components/ui/button"
import { FileText,Download,Share2,Heart, Calendar, MessageCircle} from "lucide-react"
import { Link } from "react-router-dom"
  
const RightSec = () => {
  return (
    <div className="w-full md:w-[25%] border gap-5 flex flex-col overflow-hidden md:h-[83.2vh]">
        <div className="w-full gap-5 flex flex-col overflow-scroll scrollbar-thin">
                <Card className="shadow-md shadow-slate-400">
                    <CardHeader >
                        <CardTitle className="flex gap-5 items-center" >
                        <MessageCircle color="#007bff" strokeWidth={1.5}/>
                          <span className="text-[1.06rem] font-semibold">Messages & Notification</span>
                        </CardTitle>
                
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5 text-[#46505f] h-[15rem] md:h-[10rem] pb-10">
                   
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
                
                
             {/*MEDICAL RECORDS  */}
            <Card  className="shadow-md shadow-slate-400">
                <CardHeader>
                    <CardTitle className="flex gap-5 items-center" >
                        <FileText color="#007bff" strokeWidth={1.5}/>
                       <span className="text-lg font-semibold"> Medical Records</span>
                    </CardTitle>
                
                </CardHeader>
                <CardContent className="flex flex-col gap-5 text-[#46505f]">
                    <div className="flex items-center justify-between">
                        Blood Test Results
                        <div className="flex justify-between w-[22%]">
                            <Download size={15}/>
                            <Share2 size={15}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        X-Ray Report
                        <div className="flex justify-between w-[22%]">
                            <Download size={15}/>
                            <Share2 size={15}/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link to='/'  className="w-full"><Button className="w-full border-[#007bff]  border bg-white hover:bg-white hover:shadow-lg text-[#007bff] bg-opacity-90">View All Reports</Button></Link>
                </CardFooter>
            </Card >
                   {/* Prescription */} 
            <Card  className="shadow-md shadow-slate-400 mb-10">
                <CardHeader>
                    <CardTitle className="flex gap-5 items-center" >
                        <Heart color="#007bff" strokeWidth={1.5}/>
                       <span className="text-lg font-semibold">Prescriptions</span>
                    </CardTitle>
                
                </CardHeader>
                <CardContent className="flex flex-col gap-5 text-[#46505f]">
                    <div className="flex items-center justify-between">
                        Metaformin
                        <div className="flex justify-between w-[22%]">
                            <Download size={15}/>
                            <Share2 size={15}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        Lisinopril
                        <div className="flex justify-between w-[22%]">
                            <Download size={15}/>
                            <Share2 size={15}/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link to='/'  className="w-full"><Button className="w-full border-[#007bff]  border bg-white hover:bg-white hover:shadow-lg text-[#007bff] bg-opacity-90">View All Reports</Button></Link>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}

export default RightSec