import { Bell, UserIcon } from "lucide-react"

const Navbar = () => {
  return (
    <>
        <div className="flex items-center md:gap-[10rem]">
            <h1 className="py-4 text-3xl font-bold border w-[full] px-10">Welcome,John</h1>
            {/* <div className="md:flex hidden  w-[25%] border p-2 items-center gap-2 border-gray-400 rounded-md">
                <Search color="gray" size={20} strokeWidth={1.3}/><input className="w-[100%] h-[1.3rem] focus:outline-none bg-[#e9f0ff]" placeholder="Search"/>
            </div> */}
            <div className="flex md:ml-[25rem] ml-[2rem] items-center md:w-[10%] justify-evenly">
                <div className="p-3 bg-white bg-opacity-60 rounded-full hidden md:flex"><Bell size={17} strokeWidth={1.5} color="#007bff"/></div>
                <div className="p-3 bg-white bg-opacity-60 rounded-full "><UserIcon size={17} strokeWidth={1.5} color="#007bff"/></div>
            </div>
        </div>
    </>
  )
}

export default Navbar