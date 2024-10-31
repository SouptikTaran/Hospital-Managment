import login from '@/assets/images/login.jpeg'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@repo/ui/components/ui/card"
import { Button } from '@repo/ui/components/ui/button'
import { useState } from 'react'
  
const Login = () => {
    const [signup,setSignUp]=useState(false);

  return (
    <div className=" flex inset-0 overflow-hidden font-raleway">
        
        <div className='absolute opacity-30 md:opacity-100 md:flex md:right-0 bottom-0  h-[100vh] overflow-hidden min-w-screen'>
            <img src={login} className='h-full w-full'></img>
        </div>
        <div className='absolute w-[30%] left-[37rem] h-[100vh] hidden md:flex z-10 bg-gradient-to-r from-[#e9f0ff] from-65% to-transparent backdrop-blur-xs'/>
    <div className="flex flex-col absolute z-50 w-[100%]">
        <div className='w-full h-[3rem] flex items-center '>
            <span className='md:m-[4rem] m-[1.5rem] text-3xl  font-bold'>EncoHealth</span>
        </div>
        <div className=' md:w-[100%] flex md:h-[80vh] items-center'>
            <Card className='md:w-[50%] p-4 w-[100%] md:m-[5rem] md:mb-3 m-[1rem] md:mt-10 mt-[5rem] md:bg-transparent md:border-none md:shadow-none shadow-lg shadow-slate-600 bg-white bg-opacity-75 backdrop-blur-sm flex flex-col gap-4'>
                <CardHeader>
                    <CardTitle className='md:text-4xl text-xl  font-semibold w-full '>
                        {signup?<span>Create Your New Account</span>:<span>Welcome Back To Your Patient Portal</span>}
                        
                    </CardTitle>
                    <CardDescription className='gap-2 flex'>
                        {signup?<span className='text-[#6C8193]'>Already have an account?</span>:<span className='text-[#6C8193]'>Don't have an account?</span>}
                        <button  onClick={(e)=>setSignUp(!signup)} className='text-[#148AF1] outline-none'>
                            {signup?<span>Login</span>:<span>Signup</span>}
                        </button>
                    </CardDescription>
                </CardHeader>
                <CardContent className='md:w-[90%] w-[100%] flex flex-col gap-5'>
                    {signup && 
                    <div className='flex md:flex-row flex-col justify-between gap-5 w-full'>
                    <label className='flex flex-col md:w-[49%] text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2'>
                        First Name
                        <input type='text' className='outline-none bg-transparent' placeholder='john@gmail.com'/>
                    </label>
                     <label className='flex flex-col md:w-[49%] text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2'>
                        Last Name
                        <input type='text' className='outline-none bg-transparent' placeholder='john@gmail.com'/>
                    </label>
                    </div>
                    }
                    <label className='flex flex-col text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2'>
                        Email
                        <input type='email' className='outline-none bg-transparent' placeholder='john@gmail.com'/>
                    </label>
                    <label className='flex flex-col text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2'>
                        Password
                        <input type='password' className='outline-none bg-transparent' placeholder='password123'/>
                    </label>
                    <span className='text-xs px-3'>Forgot Password?</span>
                </CardContent>
                <CardFooter>
                    <Button className='md:w-[90%] w-[100%] bg-[#194778] text-white text-md  font-semibold'>
                        {signup?<span>Signup</span>:<span>Login</span>}
                    </Button>
                </CardFooter>
            </Card>
        </div> 
     </div>

    </div>
  )
}

export default Login