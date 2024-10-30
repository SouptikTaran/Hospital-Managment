import SideItem from "./ui/SideItem"
import { Bell, FileText, LayoutDashboard, LogOut, User } from 'lucide-react';
import { Calendar } from 'lucide-react';
 
export const LeftSection = () => {
  return (
    <>
      <div className="md:flex flex-col items-center hidden justify-start gap-4 w-[20%] bg-[#f9fbff] border-r-2 pt-4 border-r-slate-300  h-[100vh]">
          <h1 className="text-2xl font-bold">EncoHealth</h1>
          <SideItem color="#007bff" >
            <div className="w-[20%]">
              <LayoutDashboard className="text-[#007bff]" size={20}/>
            </div>
            <span className="w-[55%]">Dashboard</span>
          </SideItem>
          <SideItem color="#46505f">
            <div className="w-[20%]">
              <Calendar size={20}/>
            </div>
            <span className="w-[55%]">Appointments</span>
            </SideItem>
          <SideItem color="#46505f">
            <div className="w-[20%]">
              <FileText size={20}/>
            </div>
            <span className="w-[55%]">Medical Records</span>
          </SideItem>
          <SideItem color="#46505f">
            <div className="w-[20%]">
              <Bell size={20}/>
            </div>
            <span className="w-[55%]">Notification</span>
          </SideItem>
          <SideItem color="#46505f">
            <div className="w-[20%]">
              <User size={20}/>
            </div>
            <span className="w-[55%]">Profile</span>
          </SideItem>
          <SideItem color="#46505f">
            <div className="w-[20%]">
              <LogOut size={20}/>
            </div>
            <span className="w-[55%]">Logout</span>
          </SideItem>
      </div>
      
    </>
  )
}
