import SideItem from "./ui/SideItem"
import { Bell, FileText, LayoutDashboard, LogOut, User } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { AppDispatch } from "@/redux/appStore";
import { removeUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutFunc } from "@/lib/Auth";
import { Link } from "react-router-dom";


export const LeftSection = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const handleLogout = async () => {
    dispatch(removeUser());
    logoutFunc()
    // navigate('/login')
  };

  return (
    <>
      <div className="md:flex flex-col items-center hidden justify-start gap-4 w-[20%]  bg-[#0a1d3c] border-r-2 pt-4 border-r-slate-300  h-[100vh]">
        <h1 className="text-2xl font-bold text-white">EncoHealth</h1>
        <div className="flex flex-col gap-5 w-full items-center mt-2">
          <SideItem color="#007bff">
            <Link to={'/'} className="w-[88%] justify-between flex">
              <div className="w-[20%] text-white">
                <LayoutDashboard size={20} />
              </div>
              <span className="w-[60%] text-white">
                 Dashboard
              </span>
            </Link>
          </SideItem>
          <SideItem color="#46505f">
          <Link to={'/booking'} className="w-[88%] justify-between flex">
              <div className="w-[20%] text-white">
                <Calendar size={20} />
              </div>
              <span className="w-[60%] text-white">
                  Appointments
              </span>
              </Link>
          </SideItem>
          <SideItem color="#46505f">
            <div className="w-[20%] text-white">
              <FileText size={20} />
            </div>
            <span className="w-[60%] text-white">Medical Records</span>
          </SideItem>
          <SideItem color="#46505f">
            <div className="w-[20%] text-white">
              <Bell size={20} />
            </div>
            <span className="w-[60%] text-white">Notification</span>
          </SideItem>
          <SideItem color="#46505f">
            <Link to={'/profile'} className="w-[88%] text-white justify-between flex ">
            <div >
              <User size={20} />
            </div>
            <span className="w-[60%] text-white">
                Profile
            </span>
            </Link>
          </SideItem>
          <SideItem color="#46505f" onClick={handleLogout}>
              <Link to={'/logout'} className="w-[88%] justify-between flex">
              <div className="w-[20%] text-white">
                <LogOut size={20} />
              </div>
              <span className="w-[60%] text-white">
                Logout
              </span>
              </Link>
          </SideItem>
        </div>
      </div>

    </>
  )
}
