import SideItem from "./ui/SideItem"
import { Bell, FileText, LayoutDashboard, LogOut, User } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { AppDispatch } from "@/redux/appStore";
import { removeUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const LeftSection = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const handleLogout = async () => {
      dispatch(removeUser());
      navigate('/login')
  };

  return (
    <>
      <div className="md:flex flex-col items-center hidden justify-start gap-4 w-[20%]  bg-[#f9fbff] border-r-2 pt-4 border-r-slate-300  h-[100vh]">
          <h1 className="text-2xl font-bold">EncoHealth</h1>
          <div className="flex flex-col gap-5 w-full items-center mt-2">
            <SideItem color="#007bff">
              <div className="w-[20%]">
                <LayoutDashboard className="text-[#007bff]" size={20}/>
              </div>
              <span className="w-[60%]">Dashboard</span>
            </SideItem>
            <SideItem color="#46505f">
              <div className="w-[20%]">
                <Calendar size={20}/>
              </div>
              <span className="w-[60%]">Appointments</span>
              </SideItem>
            <SideItem color="#46505f">
              <div className="w-[20%]">
                <FileText size={20}/>
              </div>
              <span className="w-[60%]">Medical Records</span>
            </SideItem>
            <SideItem color="#46505f">
              <div className="w-[20%]">
                <Bell size={20}/>
              </div>
              <span className="w-[60%]">Notification</span>
            </SideItem>
            <SideItem color="#46505f">
              <div className="w-[20%]">
                <User size={20}/>
              </div>
              <span className="w-[60%]">Profile</span>
            </SideItem>
            <SideItem color="#46505f" onClick={handleLogout}>
              <div className="w-[20%]">
                <LogOut size={20} />
              </div>
              <span className="w-[60%]">Logout</span>
            </SideItem>
          </div>
      </div>
      
    </>
  )
}
