
// import {Clock} from 'lucide-react'

interface Props{
    icons?:any;
    title?:string;
    content?:string;
}
export default function QuickInfoCard({icons,title,content}:Props) {
  return (
    <div className="flex flex-col justify-around border bg-white w-full md:w-[32%] p-5 h-[8rem] rounded-lg shadow-md shadow-slate-400">
        <div className='flex justify-between items-center'>
            <p className="font-semibold text-xl md:text-sm">{title}</p>
            {icons}
        </div>
        <h1 className="text-2xl md:text-xl font-bold">{content}</h1>
    </div>
  )
}
