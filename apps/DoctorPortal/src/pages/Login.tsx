/* eslint-disable @typescript-eslint/no-explicit-any */
import loginImage from '@/assets/images/login.jpeg';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from '@repo/ui/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/redux/userSlice';
// import useAuth from '@/hooks/useAuth';
axios.defaults.withCredentials = true;

const Login = () => {
    const [signup, setSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [gender, setGender] = useState('');  

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.user);
    console.log(userInfo)
    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[])
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const handleAuth = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        
        const url = signup ? '/api/patient/signup' : '/api/patient/login';
        const payload = {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
            ...(signup && { 
                firstName: firstNameRef?.current?.value, 
                lastName: lastNameRef?.current?.value,
                gender: gender, // Include gender in payload for signup
                
            }),
        };

        try {
            const response = await axios.post(`http://localhost:5000${url}`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response.data);
            const {email , firstName} = response.data.user;
            dispatch(addUser({email , firstName}))
            setSuccess(signup ? 'Account created successfully!' : 'Login successful!');
            console.log("hello")
            navigate('/');
        } catch (err:any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex inset-0 overflow-hidden font-raleway bg-blue-200">
            <div className="absolute opacity-30 md:opacity-100 md:flex md:right-0 bottom-0 h-[100vh] overflow-hidden min-w-screen">
                <img src={loginImage} className="h-full w-full" alt="Login background"/>
            </div>
            <div className="absolute w-[23%] left-[37rem] h-[100vh] hidden md:flex z-10 bg-gradient-to-r from-[#e9f0ff] from-65% to-transparent backdrop-blur-xs" />
            <div className="flex flex-col absolute z-50 w-[100%]">
                <div className="w-full h-[3rem] flex items-center">
                    <span className="md:m-[4rem] m-[1.5rem] text-3xl font-bold">EncoHealth</span>
                </div>
                <div className="md:w-[100%] flex md:h-[80vh] items-center">
                    <Card className="md:w-[50%] p-4 w-[100%] md:m-[5rem] md:mb-3 m-[1rem] md:mt-10 mt-[5rem] md:bg-transparent md:border-none md:shadow-none shadow-lg shadow-slate-600 bg-white bg-opacity-75 backdrop-blur-sm flex flex-col gap-4">
                        <CardHeader>
                            <CardTitle className="md:text-4xl text-xl font-semibold w-full">
                                {signup ? 'Create Your New Account' : 'Welcome Back To Your Doctor Portal'}
                            </CardTitle>
                            <CardDescription className="gap-2 flex">
                                {signup ? 'Already have an account?' : "Don't have an account?"}
                                <button onClick={() => setSignUp(!signup)} className="text-[#148AF1] outline-none">
                                    {signup ? 'Login' : 'Signup'}
                                </button>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="md:w-[90%] w-[100%] flex flex-col gap-5">
                            {signup && (
                                <>
                                    <div className="flex md:flex-row flex-col justify-between gap-5 w-full">
                                        <label className="flex flex-col md:w-[49%] text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2">
                                            First Name
                                            <input ref={firstNameRef} type="text" className="outline-none bg-transparent" placeholder="First Name"/>
                                        </label>
                                        <label className="flex flex-col md:w-[49%] text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2">
                                            Last Name
                                            <input ref={lastNameRef} type="text" className="outline-none bg-transparent" placeholder="Last Name"/>
                                        </label>
                                    </div>  
                                    
                                    <div className="flex gap-5">
                                        <label className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                value="Male" 
                                                checked={gender === 'Male'} 
                                                onChange={() => setGender('Male')} 
                                                className="text-[#148AF1]"
                                            />
                                            Male
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                value="Female" 
                                                checked={gender === 'Female'} 
                                                onChange={() => setGender('Female')} 
                                                className="text-[#148AF1]"
                                            />
                                            Female
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                value="Other" 
                                                checked={gender === 'Other'} 
                                                onChange={() => setGender('Other')} 
                                                className="text-[#148AF1]"
                                            />
                                            Other
                                        </label>
                                    </div>
                                </>
                            )}
                            <label className="flex flex-col text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2">
                                Email
                                <input ref={emailRef} type="email" className="outline-none bg-transparent" placeholder="john@gmail.com"/>
                            </label>
                            <label className="flex flex-col text-sm md:bg-blue-100 bg-white md:shadow-md shadow-lg shadow-slate-400 bg-opacity-55 rounded-lg backdrop-blur-xl px-4 py-2">
                                Password
                                <input ref={passwordRef} type="password" className="outline-none bg-transparent" placeholder="password123"/>
                            </label>
                            <span className="text-xs px-3">Forgot Password?</span>
                            {error && <span className="text-red-500 text-sm">{error}</span>}
                            {success && <span className="text-green-500 text-sm">{success}</span>}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleAuth} disabled={loading} className="md:w-[90%] w-[100%] bg-[#194778] text-white text-md font-semibold">
                                {loading ? 'Processing...' : signup ? 'Signup' : 'Login'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
