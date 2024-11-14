import React,{ReactNode} from 'react'
interface Props {
    children?: ReactNode;
    color?:string;
    onClick?:()=>void;
    
}
const SideItem = ({children,color,onClick}:Props) => {
  return (
    <div onClick={onClick} className={`h-[2.3rem] text-sm rounded-sm px-2 py-1 w-[90%] gap-5 flex items-center justify-center  active:bg-[#007bff] cursor-pointer hover:bg-[#007bff] hover:bg-opacity-10 text-[${color}]`} color={color}>{children}</div>
  )
}

export default SideItem