import { LayoutDashboard } from "lucide-react"
import { Calendar,FileText,Bell } from "lucide-react"
const BottomNav = () => {
  return (
    <div>
        <div className="md:hidden flex w-full justify-evenly bg-[#f9fbff] backdrop-blur-md bg-opacity-40 py-2">
        {/* TO BE CHANGED TO LINK!!! */}
          <button><LayoutDashboard size={30} color="#3c82f6" strokeWidth={1.5}/></button>
          <button><Calendar size={30} color="#3c82f6" strokeWidth={1.5}/></button>
          <button><FileText size={30} color="#3c82f6" strokeWidth={1.5}/></button>
          <button><Bell size={30} color="#3c82f6" strokeWidth={1.5}/></button>
        </div>
    </div>
  )
}

export default BottomNav